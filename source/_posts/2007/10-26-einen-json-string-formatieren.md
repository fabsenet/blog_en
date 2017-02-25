---
title: Einen JSON-String formatieren
id: 121
tags:
  - AJAX
  - coding
  - Java
date: 2007-10-26T11:27:52.000Z
author: Fabian Wetzel
---

Wie bereits &#xF6;fter schon hier erw&#xE4;hnt, arbeite ich zur Zeit an einer Webanwendung. Nat&#xFC;rlich nutze ich auch AJAX! Allerdings nutze ich zur &#xDC;bergabe nicht XML sondern [JSON](http://json.org/). Ich nutze auf der Serverseite [SOJO](http://sojo.sourceforge.net/) um zwischen Java-Objekten nach JSON hin und her zu konvertieren.

Leider ist der erzeugte JSON-String eine lange Zeile ohne Leerzeichen und Zeilenumbr&#xFC;chen. Das st&#xF6;rt ungemein, wenn man mal gucken will, ob das richtige &#xFC;bermittelt wird. Ich hatte mich also auf die Suche nach einem JSON Formatter gemacht, nur leider gibt quasi nur einen, der ben&#xF6;tigt aber Copy&amp;Paste des Strings, da ich ihn nicht einbetten kann. Nun hab ich mir schnell eine Java-Funktion geschrieben, die einen JSON String in einen lesbaren umwandelt. Ich hoffe es n&#xFC;tzt wem!

Quellcode gibts nach dem Link.

<!--more-->

Es gab Probleme mit Backslashes hier in dem Blog, sollte es bei euch also nicht funktionieren, dann schaut zuerst danach!

   <div class="wlWriterSmartContent" id="scid:F2210F5F-69EB-4d4c-AFF7-B8A050E9CC72:f8bdfbc1-b19f-4620-af2c-db6d3c05cde8" style="padding-right: 0px; display: inline; padding-left: 0px; float: none; padding-bottom: 0px; margin: 0px; padding-top: 0px"><pre  style="width:100%;background-color:#DDDDDD;"><div><!--

Code highlighting produced by Actipro CodeHighlighter (freeware)
http://www.CodeHighlighter.com/

--><span style="color: #999999;"> 1</span> <span style="color: #0000FF;">public</span><span style="color: #000000;"> String makeReadable(String json) {
</span><span style="color: #999999;"> 2</span> <span style="color: #000000;">   StringBuilder sb </span><span style="color: #000000;">=</span><span style="color: #000000;"> </span><span style="color: #0000FF;">new</span><span style="color: #000000;"> StringBuilder();
</span><span style="color: #999999;"> 3</span> <span style="color: #000000;">   </span><span style="color: #0000FF;">int</span><span style="color: #000000;"> indent </span><span style="color: #000000;">=</span><span style="color: #000000;"> </span><span style="color: #000000;">0</span><span style="color: #000000;">;
</span><span style="color: #999999;"> 4</span> <span style="color: #000000;">   </span><span style="color: #0000FF;">boolean</span><span style="color: #000000;"> inString </span><span style="color: #000000;">=</span><span style="color: #000000;"> </span><span style="color: #0000FF;">false</span><span style="color: #000000;">;
</span><span style="color: #999999;"> 5</span> <span style="color: #000000;">   </span><span style="color: #0000FF;">char</span><span style="color: #000000;"> lastChar </span><span style="color: #000000;">=</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">;
</span><span style="color: #999999;"> 6</span> <span style="color: #000000;">   </span><span style="color: #0000FF;">char</span><span style="color: #000000;"> c;
</span><span style="color: #999999;"> 7</span> <span style="color: #000000;">   </span><span style="color: #0000FF;">for</span><span style="color: #000000;"> (</span><span style="color: #0000FF;">int</span><span style="color: #000000;"> i </span><span style="color: #000000;">=</span><span style="color: #000000;"> </span><span style="color: #000000;">0</span><span style="color: #000000;">; i </span><span style="color: #000000;">&lt;</span><span style="color: #000000;"> json.length(); i</span><span style="color: #000000;">++</span><span style="color: #000000;">) {
</span><span style="color: #999999;"> 8</span> <span style="color: #000000;">      </span><span style="color: #008000;">//</span><span style="color: #008000;"> Schleife f&#252;r jedes Zeichen</span><span style="color: #008000;">
</span><span style="color: #999999;"> 9</span> <span style="color: #008000;"></span><span style="color: #000000;">      c </span><span style="color: #000000;">=</span><span style="color: #000000;"> json.charAt(i);
</span><span style="color: #999999;">10</span> <span style="color: #000000;">      </span><span style="color: #0000FF;">if</span><span style="color: #000000;"> (c </span><span style="color: #000000;">==</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">&quot;</span><span style="color: #000000;">'</span><span style="color: #000000;"> </span><span style="color: #000000;">&amp;&amp;</span><span style="color: #000000;"> lastChar </span><span style="color: #000000;">!=</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">\\</span><span style="color: #000000;">'</span><span style="color: #000000;">) {
</span><span style="color: #999999;">11</span> <span style="color: #000000;">         inString </span><span style="color: #000000;">=</span><span style="color: #000000;"> </span><span style="color: #000000;">!</span><span style="color: #000000;">inString;
</span><span style="color: #999999;">12</span> <span style="color: #000000;">      }
</span><span style="color: #999999;">13</span> <span style="color: #000000;">      </span><span style="color: #0000FF;">if</span><span style="color: #000000;"> (inString) {
</span><span style="color: #999999;">14</span> <span style="color: #000000;">         </span><span style="color: #008000;">//</span><span style="color: #008000;"> innerhalb Strings darf nichts ge&#228;ndert werden!</span><span style="color: #008000;">
</span><span style="color: #999999;">15</span> <span style="color: #008000;"></span><span style="color: #000000;">         sb.append(c);
</span><span style="color: #999999;">16</span> <span style="color: #000000;">      } </span><span style="color: #0000FF;">else</span><span style="color: #000000;"> {
</span><span style="color: #999999;">17</span> <span style="color: #000000;">         </span><span style="color: #008000;">//</span><span style="color: #008000;"> normales Verhalten au&#223;erhalb eines Strings</span><span style="color: #008000;">
</span><span style="color: #999999;">18</span> <span style="color: #008000;"></span><span style="color: #000000;">         </span><span style="color: #0000FF;">switch</span><span style="color: #000000;"> (c) {
</span><span style="color: #999999;">19</span> <span style="color: #000000;">         </span><span style="color: #0000FF;">case</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">\n</span><span style="color: #000000;">'</span><span style="color: #000000;">:
</span><span style="color: #999999;">20</span> <span style="color: #000000;">         </span><span style="color: #0000FF;">case</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">:
</span><span style="color: #999999;">21</span> <span style="color: #000000;">         </span><span style="color: #0000FF;">case</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">\t</span><span style="color: #000000;">'</span><span style="color: #000000;">:
</span><span style="color: #999999;">22</span> <span style="color: #000000;">            </span><span style="color: #008000;">//</span><span style="color: #008000;"> alte Formatierungen entfernen</span><span style="color: #008000;">
</span><span style="color: #999999;">23</span> <span style="color: #008000;"></span><span style="color: #000000;">            </span><span style="color: #0000FF;">break</span><span style="color: #000000;">;
</span><span style="color: #999999;">24</span> <span style="color: #000000;">         </span><span style="color: #0000FF;">case</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">[</span><span style="color: #000000;">'</span><span style="color: #000000;">:
</span><span style="color: #999999;">25</span> <span style="color: #000000;">            sb.append(</span><span style="color: #000000;">&quot;</span><span style="color: #000000;">\n</span><span style="color: #000000;">&quot;</span><span style="color: #000000;">);
</span><span style="color: #999999;">26</span> <span style="color: #000000;">            appendIndents(sb, indent);
</span><span style="color: #999999;">27</span> <span style="color: #000000;">            sb.append(c);
</span><span style="color: #999999;">28</span> <span style="color: #000000;">            sb.append(</span><span style="color: #000000;">&quot;</span><span style="color: #000000;">\n</span><span style="color: #000000;">&quot;</span><span style="color: #000000;">);
</span><span style="color: #999999;">29</span> <span style="color: #000000;">            appendIndents(sb, </span><span style="color: #000000;">++</span><span style="color: #000000;">indent);
</span><span style="color: #999999;">30</span> <span style="color: #000000;">            </span><span style="color: #0000FF;">break</span><span style="color: #000000;">;
</span><span style="color: #999999;">31</span> <span style="color: #000000;">         </span><span style="color: #0000FF;">case</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">{</span><span style="color: #000000;">'</span><span style="color: #000000;">:
</span><span style="color: #999999;">32</span> <span style="color: #000000;">            sb.append(c);
</span><span style="color: #999999;">33</span> <span style="color: #000000;">            sb.append(</span><span style="color: #000000;">&quot;</span><span style="color: #000000;">\n</span><span style="color: #000000;">&quot;</span><span style="color: #000000;">);
</span><span style="color: #999999;">34</span> <span style="color: #000000;">            appendIndents(sb, </span><span style="color: #000000;">++</span><span style="color: #000000;">indent);
</span><span style="color: #999999;">35</span> <span style="color: #000000;">            </span><span style="color: #0000FF;">break</span><span style="color: #000000;">;
</span><span style="color: #999999;">36</span> <span style="color: #000000;">         </span><span style="color: #0000FF;">case</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">}</span><span style="color: #000000;">'</span><span style="color: #000000;">:
</span><span style="color: #999999;">37</span> <span style="color: #000000;">         </span><span style="color: #0000FF;">case</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">]</span><span style="color: #000000;">'</span><span style="color: #000000;">:
</span><span style="color: #999999;">38</span> <span style="color: #000000;">            sb.append(</span><span style="color: #000000;">&quot;</span><span style="color: #000000;">\n</span><span style="color: #000000;">&quot;</span><span style="color: #000000;">);
</span><span style="color: #999999;">39</span> <span style="color: #000000;">            appendIndents(sb, </span><span style="color: #000000;">--</span><span style="color: #000000;">indent);
</span><span style="color: #999999;">40</span> <span style="color: #000000;">            sb.append(c);
</span><span style="color: #999999;">41</span> <span style="color: #000000;">            </span><span style="color: #0000FF;">break</span><span style="color: #000000;">;
</span><span style="color: #999999;">42</span> <span style="color: #000000;">         </span><span style="color: #0000FF;">case</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">:</span><span style="color: #000000;">'</span><span style="color: #000000;">:
</span><span style="color: #999999;">43</span> <span style="color: #000000;">            sb.append(</span><span style="color: #000000;">'</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">);
</span><span style="color: #999999;">44</span> <span style="color: #000000;">            sb.append(c);
</span><span style="color: #999999;">45</span> <span style="color: #000000;">            sb.append(</span><span style="color: #000000;">'</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">);
</span><span style="color: #999999;">46</span> <span style="color: #000000;">            </span><span style="color: #0000FF;">break</span><span style="color: #000000;">;
</span><span style="color: #999999;">47</span> <span style="color: #000000;">         </span><span style="color: #0000FF;">case</span><span style="color: #000000;"> </span><span style="color: #000000;">'</span><span style="color: #000000;">,</span><span style="color: #000000;">'</span><span style="color: #000000;">:
</span><span style="color: #999999;">48</span> <span style="color: #000000;">            sb.append(c);
</span><span style="color: #999999;">49</span> <span style="color: #000000;">            sb.append(</span><span style="color: #000000;">'</span><span style="color: #000000;">\n</span><span style="color: #000000;">'</span><span style="color: #000000;">);
</span><span style="color: #999999;">50</span> <span style="color: #000000;">            appendIndents(sb, indent);
</span><span style="color: #999999;">51</span> <span style="color: #000000;">            </span><span style="color: #0000FF;">break</span><span style="color: #000000;">;
</span><span style="color: #999999;">52</span> <span style="color: #000000;">         </span><span style="color: #0000FF;">default</span><span style="color: #000000;">:
</span><span style="color: #999999;">53</span> <span style="color: #000000;">            sb.append(c);
</span><span style="color: #999999;">54</span> <span style="color: #000000;">         }
</span><span style="color: #999999;">55</span> <span style="color: #000000;">      }
</span><span style="color: #999999;">56</span> <span style="color: #000000;">      lastChar </span><span style="color: #000000;">=</span><span style="color: #000000;"> c;
</span><span style="color: #999999;">57</span> <span style="color: #000000;">   }
</span><span style="color: #999999;">58</span> <span style="color: #000000;">   </span><span style="color: #0000FF;">return</span><span style="color: #000000;"> sb.toString();
</span><span style="color: #999999;">59</span> <span style="color: #000000;">}
</span><span style="color: #999999;">60</span> <span style="color: #000000;">
</span><span style="color: #999999;">61</span> <span style="color: #000000;"></span><span style="color: #0000FF;">private</span><span style="color: #000000;"> </span><span style="color: #0000FF;">void</span><span style="color: #000000;"> appendIndents(StringBuilder sb, </span><span style="color: #0000FF;">int</span><span style="color: #000000;"> indent) {
</span><span style="color: #999999;">62</span> <span style="color: #000000;">   </span><span style="color: #0000FF;">for</span><span style="color: #000000;"> (</span><span style="color: #0000FF;">int</span><span style="color: #000000;"> i </span><span style="color: #000000;">=</span><span style="color: #000000;"> </span><span style="color: #000000;">0</span><span style="color: #000000;">; i </span><span style="color: #000000;">&lt;</span><span style="color: #000000;"> indent; i</span><span style="color: #000000;">++</span><span style="color: #000000;">) {
</span><span style="color: #999999;">63</span> <span style="color: #000000;">      sb.append(</span><span style="color: #000000;">&quot;</span><span style="color: #000000;">\t</span><span style="color: #000000;">&quot;</span><span style="color: #000000;">);
</span><span style="color: #999999;">64</span> <span style="color: #000000;">   }
</span><span style="color: #999999;">65</span> <span style="color: #000000;">
</span><span style="color: #999999;">66</span> <span style="color: #000000;">}</span></div></pre></div>

