---
title: 'UDP Broadcasts mit C# versenden (extended)'
tags:
  - 'C#'
  - coding
  - Netzwerk
date: 2008-10-29T21:00:50.000Z
author: Fabian Wetzel
---

Den [Standardweg](http://dotnet-snippets.de/dns/c-broadcast-senden-SID567.aspx) (_Da ist übrigens ein Fehler drin: SocketOptionName.Broadcast muss auf 1 statt auf 0 gesetzt werden), _wie man Broadcasts versendet, hatte auf meinem Rechner zur Folge, dass nur ein einziger Netzwerkadapter die Broadcasts versendete. Dies war nicht das, was ich wollte, denn es war auch noch ein VMWare-Adapter.

Nach etwas Probieren fand ich heraus, dass statt _IPAddress.Broadcast_ besser _IPAddress.Parse(...)_ mit der richtigen Broadcast-IP für das jeweilige Netz genommen werden sollte. Ich suchte mir also das nötige Zeug von [zwei](http://dotnet-snippets.de/dns/c-netzwerkinformationen-abfragen-SID197.aspx) [Artikeln](http://www.codeproject.com/KB/dotnet/BroadCast.aspx) zusammen: Ich frage nun alle Netzwerkkarten ab, die IP können, kalkuliere deren Broadcast-IP und versende dann das Broadcast-Paket für jedes Netz einzeln in einer Schleife. Nun bekommen alle Netze meinen Broadcast, wie gewünscht!

Wer den Quelltext sehen will, sollte den Artikel weiterlesen!
<!--more-->  <div class="csharpcode"><pre class="csharpcode"><span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">void</span> SendBroadcastPacket(<span class="kwrd">int</span> destinationPort, <span class="kwrd">byte</span>[] content)
{
    var NetworkInfo = <span class="kwrd">new</span> ManagementObjectSearcher(<span class="str">"SELECT * FROM Win32_NetworkAdapterConfiguration WHERE IPEnabled = 'TRUE'"</span>);
    ManagementObjectCollection MOC = NetworkInfo.Get();
    <span class="kwrd">foreach</span> (ManagementObject mo <span class="kwrd">in</span> MOC)
    {
        var adapterAddresses = (<span class="kwrd">string</span>[])mo[<span class="str">"IPAddress"</span>];
        var adapterSubnetMasks = (<span class="kwrd">string</span>[])mo[<span class="str">"IPSubnet"</span>];

        <span class="kwrd">if</span> (adapterAddresses.Count() &gt; 0 &amp;&amp; adapterSubnetMasks.Count() &gt; 0)
        {
            <span class="kwrd">try</span>
            {
                IPAddress broadcastIpForAdapter = GetBroadcastAddress(IPAddress.Parse(adapterAddresses[0]),
                                                                      IPAddress.Parse(adapterSubnetMasks[0]));
                SendBroadcastPacketToBroadcastIp(broadcastIpForAdapter, destinationPort, content);
            }
            <span class="kwrd">catch</span> (Exception ex)
            {
                Debug.WriteLine(ex.ToString());
            }
        }
    }
}

<span class="kwrd">private</span> <span class="kwrd">static</span> IPAddress GetBroadcastAddress(IPAddress ipAddress, IPAddress subnetMask)
{
    <span class="kwrd">byte</span>[] ipAdressBytes = ipAddress.GetAddressBytes();
    <span class="kwrd">byte</span>[] subnetMaskBytes = subnetMask.GetAddressBytes();
    <span class="kwrd">if</span> (ipAdressBytes.Length != subnetMaskBytes.Length)
        <span class="kwrd">throw</span> <span class="kwrd">new</span> ArgumentException(<span class="str">"Both IP address and subnet mask should be of the same length"</span>);
    var result = <span class="kwrd">new</span> <span class="kwrd">byte</span>[ipAdressBytes.Length];
    <span class="kwrd">for</span> (<span class="kwrd">int</span> i = 0; i &lt; result.Length; i++)
        result[i] = (<span class="kwrd">byte</span>)(ipAdressBytes[i] | (subnetMaskBytes[i] ^ 255));
    <span class="kwrd">return</span> <span class="kwrd">new</span> IPAddress(result);
}

<span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">void</span> SendBroadcastPacketToBroadcastIp(IPAddress broadcastIp, <span class="kwrd">int</span> destinationPort, <span class="kwrd">byte</span>[] content)
{
    Socket sock = <span class="kwrd">null</span>;
    <span class="kwrd">try</span>
    {
        var destinationEndpoint = <span class="kwrd">new</span> IPEndPoint(broadcastIp, destinationPort);
        sock = <span class="kwrd">new</span> Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
        sock.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.Broadcast, 1);
        sock.SendTo(content, destinationEndpoint);
    }
    <span class="kwrd">finally</span>
    {
        <span class="kwrd">if</span> (sock != <span class="kwrd">null</span>)
        {
            sock.Close();
        }
    }
}</pre>
<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>
</div>


