---
tags: project
title: lanterns
year : 2017-2019
layout: project.njk
date: 2017-07-07
projecttags: "installation,responsive-media,installation,workshop,sound,collaboration,performance,technology,new-materialism,posthumanities,dance,embodiment"
header: lanterns.jpg
---

Lanterns is a digital-physical responsive light and multi-channel sound instrument I developed during my PhD to probe the dynamics of collaboration between groups of people with inorganic, moving matter. This work generated performances, workshops and scholarship.

I worked in collaboration with dancer/choreographer Britta Joy Peterson and lighting designer Evan Anderson.

The work was hosted by Synthesis Center at ASU, where it was shown publicly in workshops and performances. We performed with the system at MOCO 2017 at Goldsmiths in London.

I designed the physical devices, and composed the responsive algorithmic sonic and lightning behaviors. I used hacked an Arduino into GameTrak controllers to sense approximately the physical movement vectors and speed of the lanterns. Arduinos sent OSC over ethernet to a computer running MaxMSP, which spatialized sound driven by speed, acceleration, and each lantern's physical proximity to one another. Max also sent lighting behaviors out over DMX to the lantern's dimmerpacks.

### performance and workshop documentation

<iframe src="https://player.vimeo.com/video/216553103?h=99d332195f" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/Evm1z-Kjllg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### gallery

{% assign gallery_images = "lantern1.jpg,lantern2.jpg,lantern3.jpg" | split: "," %}
{% assign gallery_alts = "Lantern installation view,Performance documentation,Technical setup" | split: "," %}
{% assign gallery_captions = "Installation view at Synthesis Center,Workshop participants engaging with lanterns,Arduino and GameTrak controller setup" | split: "," %}
{% assign gallery_columns = 3 %}
{% include "gallery-liquid.njk" %}

### bibliography

"[Ensemble, Entrainment, and Movement in the Mess of the Matter: Non-anthropocentric Design of Responsive-Media Environments](/assets/pdf/mess-of-the-matter.pdf)", _Journal of Somaesthetics_ (2019).

"[Lanterns: An Enacted and Material Approach to Ensemble Group Activity with Responsive Media](/assets/pdf/ensemble.pdf)". Proceedings of Movement and Computing conference (2018)
