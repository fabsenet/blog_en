---
title: 'UDP Broadcasts mit C# versenden (extended)'
tags:
  - 'C#'
  - coding
  - Netzwerk
date: 2008-10-29T21:00:50.000Z
author: Fabian Wetzel
---

Den [Standardweg](http://dotnet-snippets.de/dns/c-broadcast-senden-SID567.aspx) (Da ist übrigens ein Fehler drin: SocketOptionName.Broadcast muss auf 1 statt auf 0 gesetzt werden), wie man Broadcasts versendet, hatte auf meinem Rechner zur Folge, dass nur ein einziger Netzwerkadapter die Broadcasts versendete. Dies war nicht das, was ich wollte, denn es war auch noch ein VMWare-Adapter.

Nach etwas Probieren fand ich heraus, dass statt `IPAddress.Broadcast` besser `IPAddress.Parse(...)` mit der richtigen Broadcast-IP für das jeweilige Netz genommen werden sollte. Ich suchte mir also das nötige Zeug von [zwei](http://dotnet-snippets.de/dns/c-netzwerkinformationen-abfragen-SID197.aspx) [Artikeln](http://www.codeproject.com/KB/dotnet/BroadCast.aspx) zusammen: Ich frage nun alle Netzwerkkarten ab, die IP können, kalkuliere deren Broadcast-IP und versende dann das Broadcast-Paket für jedes Netz einzeln in einer Schleife. Nun bekommen alle Netze meinen Broadcast, wie gewünscht!

Hier der finale Quellcode:
```cs
private static void SendBroadcastPacket(int destinationPort, byte[] content)
{
    var NetworkInfo = new ManagementObjectSearcher("SELECT * FROM Win32_NetworkAdapterConfiguration WHERE IPEnabled = 'TRUE'");
    ManagementObjectCollection MOC = NetworkInfo.Get();
    foreach (ManagementObject mo in MOC)
    {
        var adapterAddresses = (string[])mo["IPAddress"];
        var adapterSubnetMasks = (string[])mo["IPSubnet"];
        if (adapterAddresses.Count() > 0 && adapterSubnetMasks.Count() > 0)
        {
            try
            {
                IPAddress broadcastIpForAdapter = GetBroadcastAddress(IPAddress.Parse(adapterAddresses[0]),
                                                                      IPAddress.Parse(adapterSubnetMasks[0]));
                SendBroadcastPacketToBroadcastIp(broadcastIpForAdapter, destinationPort, content);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.ToString());
            }
        }
    }
}

private static IPAddress GetBroadcastAddress(IPAddress ipAddress, IPAddress subnetMask)
{
    byte[] ipAdressBytes = ipAddress.GetAddressBytes();
    byte[] subnetMaskBytes = subnetMask.GetAddressBytes();
    if (ipAdressBytes.Length != subnetMaskBytes.Length)
        throw new ArgumentException("Both IP address and subnet mask should be of the same length");
    var result = new byte[ipAdressBytes.Length];
    for (int i = 0; i < result.Length; i++)
        result[i] = (byte)(ipAdressBytes[i] | (subnetMaskBytes[i] ^ 255));
    return new IPAddress(result);
}

private static void SendBroadcastPacketToBroadcastIp(IPAddress broadcastIp, int destinationPort, byte[] content)
{
    Socket sock = null;
    try
    {
        var destinationEndpoint = new IPEndPoint(broadcastIp, destinationPort);
        sock = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
        sock.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.Broadcast, 1);
        sock.SendTo(content, destinationEndpoint);
    }
    finally
    {
        if (sock != null)
        {
            sock.Close();
        }
    }
}
```



