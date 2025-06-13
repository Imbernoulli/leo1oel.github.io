<h1 id="services"></h1>

<h2 style="margin: 60px 0px 10px;">Services</h2>

<h3 style="margin:0 10px 0;">Conference</h3>
<ul style="margin:0 0 5px;">
{% for item in site.data.service.conference %}
  <li><a href="{{ item.link }}"><autocolor>{{ item.content }}</autocolor></a></li>
{% endfor %}
</ul>

<!--
<h3 style="margin:0 10px 0;">Journal Reviewers</h3>

<ul style="margin:0 0 20px;">
  <li><a href="https://www.computer.org/csdl/journal/tp"><autocolor>IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)</autocolor></a></li>
  <li><a href="https://www.springer.com/journal/11263"><autocolor>International Journal of Computer Vision (IJCV)</autocolor></a></li>
  <li><a href="https://signalprocessingsociety.org/publications-resources/ieee-transactions-image-processing"><autocolor>IEEE Transactions on Image Processing (TIP)</autocolor></a></li>
  <li><a href="https://www.computer.org/csdl/journal/tk"><autocolor>IEEE Transactions on Knowledge and Data Engineering (TKDE)</autocolor></a></li>
  <li><a href="https://signalprocessingsociety.org/publications-resources/ieee-transactions-multimedia"><autocolor>IEEE Transactions on Multimedia (TMM)</autocolor></a></li>
  <li><a href="https://ieee-cas.org/publications/ieee-transactions-circuits-and-systems-video-technology"><autocolor>IEEE Transactions on Circuits and Systems for Video Technology (TCSVT)</autocolor></a></li>
  <li><a href="https://cis.ieee.org/publications/t-neural-networks-and-learning-systems"><autocolor>IEEE Transactions on Neural Networks and Learning Systems (TNNLS)</autocolor></a></li>
  <li><a href="https://dl.acm.org/journal/tomm"><autocolor>ACM Transactions on Multimedia Computing, Communications, and Applications (TOMM)</autocolor></a></li>
</ul>
