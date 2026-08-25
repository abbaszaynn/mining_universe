
import type { Company, NewsArticle, Document, GalleryImage } from '@/lib/types';
import { galleryImages } from '@/lib/gallery-images-data';
import { companies as companiesData } from '@/lib/companies-data';

const allDocuments: Document[] = [
  { id: 'doc-gb-mineral-corridor-report', companyId: 'durr-zircon', title: 'GB Mineral Corridor Report 2026', type: 'Investor Report', url: '/reports/gb-mineral-corridor-report-2026.pdf' },
  { id: 'doc-zircon-geological-report', companyId: 'durr-zircon', title: 'Geological Report', type: 'Geological Report', url: 'https://mega.nz/file/9VJmDCxJ#ME379aCjr7LpYjspREoOOivos9fIIdJ3nSboo9G_uYw' },
  { id: 'doc-1', companyId: 'durr-zircon', title: 'Copper Ore at Skardu,  Tehsil Gultari', type: 'Geological Report', url: 'https://mega.nz/file/gIZRxJZY#iumoVJkKeejUdux1fQz-Y31o0lAMDcMhJ3X-KnDNyL0' },
  { id: 'doc-7', companyId: 'durr-zircon', title: 'Marble Ore at Bagicha', type: 'Geological Report', url: 'https://mega.nz/file/4UhxmTKY#AzFv7Jc3IE11OhBKdGSbaRYKM85UhmtwrOKc96f9vcI' },
  { id: 'doc-2', companyId: 'durr-zircon', title: 'MINING LICENSE', type: 'License', url: '#' },
  {
    id: 'doc-8',
    companyId: 'earth-lux-mines',
    title: 'Incorporation Letter',
    type: 'License',
    url: 'https://mega.nz/file/NAY3GaQZ#igzi5X3SNFZkZAGjLZ-a5rWd-qcfVyL65Ks1zcPeyQQ',
    contentText: `SECURITIES AND EXCHANGE COMMISSION OF PAKISTAN
 Company Registration Office
 CERTIFICATE OF INCORPORATION
 [Under section 16 of the Companies Act, 2017 (XIX of 2017)]
 Corporate Unique Identification No. 0238137
         I hereby certify that EARTH LUX MINES & MINERALS (PRIVATE)
 LIMITED is this day incorporated under the Companies Act, 2017 (XIX of
 2017) and that the company is limited by shares.
 Given at Gilgit this Twenty Eighth day of August, Two Thousand and
 Twenty Three
 Muhammad Shoaib Khan
 Assistant Registrar`
  },
  {
    id: 'doc-9',
    companyId: 'earth-lux-mines',
    title: 'Geological Report - Gupis, Ghizer',
    type: 'Geological Report',
    url: 'https://mega.nz/file/BQhDEIJL#JXvUAfDZsxfiWlTOWGHEP64WQWvArnKuwEseFZX6UBU',
    contentText: `Geological Field Report of Copper Ore at Gupis, 
Tehsil Yasin, District Ghizer, Gilgit-Baltistan, Pakistan 
Earth Lux Mines & Minerals (Pvt) Ltd. 
1 
Introduction of Company:  
Earth Lux Mines & Minerals (Pvt) Ltd. is a mining company committed to the 
exploration, extraction, and processing of high-quality minerals and metals. 
Established in 2023, our company has built a strong reputation for innovation, 
sustainability, and operational excellence in the mining industry. With a 
presence in key mineral-rich regions, we leverage cutting-edge technology and 
industry best practices to ensure efficient and responsible mining operations. 
Our expertise lies in extracting ore and supplying vital raw ore to industries 
across the globe. In order to maximize resource efficiency and maintain the 
highest safety and environmental standards, our skilled team of geologists, 
engineers, and environmental specialists works tirelessly. 
The company wants to start mining in the area, which will benefit the locals' 
social standing and infrastructure development while also generating income 
for the Gilgit-Baltistan government in the form of royalties. For the first three 
years of its E/L validity period, the company also plans to invest an additional 
Rs. 43.0 million in the relevant heads of expenditures for the mining and 
development of this potential, which is already described in the enclosed 
budget proposals as a risk capital investment. 
Company’s Main Aim & Objectives: 
● Infrastructure development (pre-mining phase) includes building access 
roads and creating platforms for work and study zones. 
● Environmental Study of the applied license area to determine key 
factors from an environmental standpoint.  
● Social Uplift of the Local Community through Economic (Works), Social 
Welfare, and Charity, which falls under CSR (Corporate Social 
Responsibility) 
● hydrological analysis to determine the groundwater table and power 
consumption.  
● Geological analysis of the entire area under consideration for the 
P.E.A./Feasibility Report  
2 
● Preparation of Geological Mapping along with Topographic mapping.  
● Mineralization Identification based on its formation and point of 
occurrences with types and extents of continuation. 
● Geochemical/Geophysical sampling of ore samples for analysis.   
● Core Sampling through Panjor Shallow Drilling, Pitting, and Trenching, 
● Deposit resource estimation using 3D grid mapping of field core samples  
● sustainable resource development – Exploration and extraction of 
mineral resources in a responsible manner while reducing environmental 
impact and guaranteeing long-term sustainability. 
● Operational Excellence – To maximize productivity and efficiency in 
mining operations by utilizing cutting-edge technologies, innovation, and 
industry best practices. 
● Environmental Stewardship – To implement eco-friendly mining 
techniques, reduce carbon footprint, and promote land rehabilitation 
and conservation. 
● Community Engagement – To foster strong relationships with local 
communities, support economic development, and enhance social 
well-being through employment opportunities and infrastructure 
development. 
● Safety and Compliance – To maintain the highest safety standards and 
adhere to national regulations, land of the land, ensuring the well-being 
of our workforce and stakeholders. 
● Value Creation – To enhance shareholder value through responsible 
mining investments, operational efficiency, and sustainable growth 
strategies. 
While maintaining environmental and social responsibility, Earth Lux Mines & 
Minerals (Pvt) Ltd. is influencing the direction of the mining sector through its 
dedication to responsible mining, innovation, and community collaboration. 
3 
Table of Content 
1. Mineral 
Resources 
Gilgit-Baltistan………................................................5 
2. Regional 
of 
Geology.…………………………………………..………………………….
 …………..9 
3. Executive 
Summary………………………………………………………………………
 …….…17 
4. Background……………………………………………………………………
 ………………………18 
5. Introduction…………………………………………………………………
 ………………………..18 
6. Topography 
& 
Features 
Area………………………………………………...18 
of 
Applied 
7. Accessibility…………………………………………………………………
 ………………………..19 
8. Google 
Earth 
Terrain 
Map…………….……………………………………………………….20 
9. Mineralization………………………………………………………………
 ……………………….20 
10. Field 
Visit 
/ 
General 
Activities……………………………………………….21 
11. Future 
Plan 
Development 
Activities…….……………………22 
12. Detail 
of 
The 
Company……..…..26 
13. Company 
Machinery/Equipment 
for 
Survey 
Exploration 
Available 
with 
Staff…………………………………………………………….……………
 ……...27 
14. Approximate Expenditure For Development of Mining Activities For  
Initial  
First 
Three 
Years…………………………………….…………….………..………28 
1. Minerals Resources of Gilgit-Baltistan 
The Gilgit-Baltistan Province includes gemstones resources and many other 
economic commodities. Besides gemstones, the Gilgit-Baltistan represents 
many important mineral resources like arsenic (arsenopyrite, chalcopyrite, 
malachite, pyrite) from Dainyor Nala (15 km NE of Gilgit) and Bagrot Nala (20 
km N of Gilgit), bauxite from Chapursan (Hunza), gold in alluvial placer or 
sediments of Indus and Gilgit rivers and it’s tributaries which is being recovered 
by screen washing of stream sediments, copper and gold associated with 
gossans/red iron oxide/ochre and base metals of Karakoram (Shyok) Suture like 
Dainyor Nala (NW of Gilgit), Barit, Bulashgah (also magnetite pod in ophiolitic 
rocks), Majadar and Bor Nala, and Bagrot Nala, Henzil (10 km NW of Gilgit), 
Sher Qila (33 km NW of Gilgit), Singal (45 km NW of Gilgit), Nazbar valley (22 
km W of Yasin), Shigari Bala area of Skardu and Golo Das and surrounding 
areas, iron from Indus Suture and its vicinity areas like Chilas, east of Gilgit, 
western, northern and eastern part of Haramosh massif forming lobe and 
possibly from Karakoram suture, lithium/lepidolite from Shengus of Nanga 
Parbat Massive (numerous pegmatites intruded in gneissic rocks), sheet 
mica/muscovite from many pegmatites like Astor, Bagarian and Hawa Gali, 
uranium from many areas; graphite from Nagar Hunza, Chalt and Chelish, 
Mesozoic coal from Chapursan valley, and widely exposed limestones and 
marbles, beautiful igneous and metamorphic different type of rocks from 
different areas. 
● Types of Metallic Minerals Found In Gilgit-Baltistan 
Gilgit-Baltistan is rich in metallic minerals due to its complex geological history. 
Some of the key metallic minerals found in the region include: 
1. Precious Metals 
● Gold (found in placer deposits in Indus and Gilgit rivers and hardrocks) 
● Silver (often associated with lead-zinc deposits in polymetallic ores) 
2. Base Metals 
● Copper (found largely in Chitral, Gilgit, and Skardu regions) 
● Lead (Kargah Valley, Shigar Valley, Skardu, and Ghizer Districts) 
● Zinc (associated with lead deposits in Gilgit, Skardu Ghizer) 
● Iron Ore (Haramosh, Skardu, and Chilas, Ishkoman Valley) 
3. Strategic and Rare Metals 
● Chromite (Chilas, Kohistan region) 
● Molybdenum (associated with porphyry copper deposits) 
● Cobalt (trace amounts found with copper ores) 
● Tungsten (reported in some pegmatite veins) 
4. Radioactive Minerals 
● Uranium (reported in small amounts in certain areas) 
These minerals are important for economic, technological, and industrial 
advancement. However, most of these resources remain underexplored and 
underexploited. 
The Gilgit Baltistan province is very significant for gemstone resources because 
of hosting two main sutures like northern Indus and Karakoram (Shyok Suture). 
The high temperature created by geodynamics and tectonic collision of 
Indo-Pak subcontinent, so their sutures are producing gemstones and also 
significant for further exploration. Gemstones like aquamarine from Askere, 
Shengus, Dasso and Tisgtung of Gilgit; emerald from Khaltaro of Gilgit; 
moonstone from Shengus and Bulachi (Gilgit); quartz from Gilgit and Skardu; 
red ruby and spinel (magnesium aluminate) from Hunza are more attractive 
than Burma, and pargasite cabochons (green amphibolite; locally purchased as 
Hunza emerald) from Hunza valley; rose quartz from Dusso pegmatites near 
Skardu; topaz from pegmatites from Bulachi, Shengus and Gone near Dusso in 
Skardu; gem tourmaline (pink, blue, green and black) from pegmatites of 
Haramosh Range like Stak Nala between Gilgit and Skardu, Bulechi and Shingus; 
beautiful pyrite, malachite and azurite in pegmatite near Gilgit. 
Types of Gems Found In Gilgit-Baltistan 
1. Precious Gemstones 
● Ruby (Hunza, Nagar, and Skardu) 
● Sapphire (Shigar Valley, Astore) 
● Emerald (Haramosh, Roundu Valley). 
2. Semi-Precious Gemstones 
● Aquamarine (Shigar, Skardu, and Chumar Bakur) 
● Tourmaline (Skardu, Baltistan) 
● Topaz (Katlang, Gilgit, and Skardu) 
● Garnet (Gilgit, Skardu, and Astore) 
● Spinel (Shigar Valley) 
● Zircon (Chilas, Skardu) 
3. Rare and Exotic Gemstones 
● Peridot (Sapat, Kohistan, and Shigar) 
● Beryl (including Goshenite and Morganite) (Skardu, Shigar) 
● Apatite (Gilgit, Skardu) 
● Fluorite (Skardu, Nagar Valley) 
● Sphene (Titanite) (Shigar Valley) 
● Serpentine (Chilas, Kohistan) 
Gilgit-Baltistan's unique geological formations make it one of the world's 
richest regions for gemstone mining. 
2.  Regional Geology 
● Geological Setting: 
Gilgit-Baltistan region is covering most part of the northern areas of Pakistan. 
The northern areas of Pakistan are mainly comprised of three tectonic plates. 
From north to south, these are Karakoram plate, Kohistan island arc and 
Indo-Pakistan plate. Kohistan island arc is sandwiched between Karakoram and 
Indo-Pakistan plates by having two main thrusts the NSZ or MKT in the north 
and the Indus Suture zone (ISZ) or Main mantle thrust (MMT) in the south 
(Tahirkheli, 1979; 1982; Bard, 1983). The GB region is mainly composed of the 
rocks of the Karakoram plate (i.e., meta-sedimentary and meta-igneous 
complexes), northern suture zone (i.e., Ophiolitic melanges) and Kohistan 
island arc (i.e-mafic-ultramafic complex and batholithic plutons). 
● Karakoram Plate 
Karakoram plate represents the northern 
most part of Pakistan and is located on 
the northern side of NSZ or MKT. The rock 
bodies exposed here are highly deformed 
sedimentary, 
meta-sedimentary and 
igneous assemblages and they are 
ranging in age from Jurassic to Late 
Cretaceous and formed as a result of 
collision between KIA with Eurasian plate 
along NSZ or MKT (Tahirkheli, 1982). 
Karakoram plate is divided by Gaetani et 
al. (1996) into the following three 
geological units from north to south as:  
1. The Northern sedimentary belt  
2. The Karakoram axial batholith 
3. The Southern metamorphic belt 
● Northern Sedimentary Belt  
The northern sedimentary belt is the northern most unit of Karakoram block 
and it is mainly consisting of up to 7km thick sedimentary belt, which is 
transgressive on a pre-Ordovician crystalline basement rocks. The sedimentary 
belt is further divided into different thrust sheets in the Chitral and Hunza 
valley along the western and eastern margin of the Karakoram block. The rock 
bodies present within this block range in age from Permian to Paleozoicand 
most of the successions within eastern Karakoram along Hunza valley are of 
Permian age (Zanchi and Gaetani, 1994; Searle, 1999). The two sub groups 
Hunza and Batura plutonic units are also included in the northern Karakoram 
block. The Hunza plutonic unit includes calc-alkaline granodiorite which has 
both biotite and hornblende mineral phases and they represent the age of 
105.7±0.5 Ma (Fraser et al., 1999) and the second group Batura plutonic unit 
consists of gabbros and diorites and it is younger than the Hunza plutonic unit 
which is more deformed. The Batura plutonic unit in the south intrudes the 
deformed and older Hunza granodiorites while in the north it intrudes Permian 
slates and Henzel. 
● The Karakoram Axial Batholith  
The Karakoram axial batholith is a large 
body of igneous rocks intruded in 
different 
times and the earliest 
magmatic episode is recorded earlier 
than 100 Ma and can be correlated with 
the initial stages of intra-oceanic 
subduction. The extension of this 
batholith is upto Ladakh in the east and 
across the border into Afghanistan in 
west. The  northern  sedimentary  belt 
in  the northern part of Karakoram plate 
is separated from the marginal mass present in the southern part of the 
Karakoram plate by this axial batholith in the Hindukush and Karakoram ranges. 
The dominant rock phases of this batholith are granodiorite, granites and 
pegmatites which are readily intruded by sills and dykes mostly basic in nature 
(Tahirkheli, 1994). 
● The Southern Metamorphic Belt  
The southern metamorphic belt of 
the Karakoram plate is developed as 
a hanging wall along the NSZ or 
MKT. The different groups included 
in this belt are variously named as 
we move from the western to the 
eastern margin (i.e., Chitral slate in 
Hindukush, Darkot group in the 
Yasin valley, Baltit group and 
Dumurdu Formation in the Hunza 
valley and Shigar group in the Baltistan region). The low grade metamorphic 
rocks in this belt are biotite-schist, chlorite-schist, quartz-schist, while the high 
grade metamorphism is demarcated by kyanite and silliminte schists. A 
marbalized bed is also present within this zone and mapped from shigar valley 
in the east upto Ishkoman valley in the west and the upper contact of this 
coarse white Henzel is with the axial Karakoram batholith (Gaetani et al., 1996; 
Tahirkheli, 1994).   
● Northern Suture Zone (NSZ) or Main Karakoram Thrust (MKT)  
Main Karakoram Thrust or NSZ is a fault contact which separates the rocks of 
Eurasian plate from the KIA. This sutures zone is formed as a result of collision 
of KIA with Eurasian plate. NSZ is comprised of ophiolitic mélange containing 
rocks like serpentinite, volcanics and marine sediments in a slate.  
The 
different 
types 
of 
sedimentary and volcanic 
rocks present on the northern 
side of KIA are separated from 
the slates and quartzites of 
the Eurasian plate by this 
mélange. The rock bodies are 
present along this 4km thick 
mélange 
are 
limestone, 
quartzite, volcanic greenstone 
and 
altered 
rocks 
like 
serpentine in a slate matrix. 
● Kohistan Island Arc  
Kohistan island arc is formed as 
a result of intra-oceanic 
subduction 
of 
neo-Tethys 
beneath Eurasian plate in late 
Jurassic to Early Cretaceous 
times and covering an area of 
about 3600km2 (Tahirkheli et 
al., 1979). KIA is separated 
from the Indian plate by MMT 
or ISZ in the south while its 
northern 
boundary is separates it from 
the Eurasian plate. The main 
rock units within KIA are amphibolites, diorites, meta-norites and associated 
volcanic rocks. KIA consists of the following geological bodies of rocks as we 
move from north to south (a) Yasin group sediments, (b) Chalt volcanic group, 
(c) Kohistan batholith, (d) Dir-Utror volcanic series, (e) Chilas complex, (f) 
Southern amphibolites belt and (g) Jijal mafic-ultramafic complex. 
● Yasin Sedimentary Group 
Yasin sedimentary group represents 
the northern part of KIA and they are 
the youngest Tethyan remains 
comprised of mainly sedimentary and 
volcano-clastic rocks. The volcanic 
rocks 
are 
metamorphosed to 
greenschist facies due to collision of 
two tectonic plates. This group shows 
variable lithologies along different 
parts of the NSZ. In the eastern part 
along Gilgit valley, this group contains 
volcanoclastics, terrigenous clastics 
and slates while in the western part 
along the Ishkoman valley, this group 
comprises of slates, silty quartzites 
and pebble-cobble conglomerates 
while limestone unit is absent in the 
ishkoman block.   
● Chalt Volcanic Group 
The rocks of the Chalt volcanic group are exposed in the south of NSZ. Chalt 
volcanic group is composed of basalts, rhyodacites and andesites and are 
generally metamorphosed to greenschist facies. The volcanic rocks present in 
this zone are highly deformed and shows metamorphic grade from greenschist 
in the west to amphibolites facies in the south. 
● Kohistan Batholith  
The presence of major belt of granitic 
rocks in the northern part of KIA were 
first described by Tahirkheli and Jan 
(1979). These were later on named as 
Kohistan batholith (by Petterson and 
Windley 
(1985). 
The 
major 
component of KIA is represented by 
Kohistan batholith. The area covered 
by this series along E-W direction is 
300km and along N-S direction is 
60km. Different rock bodies found in 
this 
batholith are granodiorite, 
diorite, 
hornblend 
hornblendite, 
grabbro and lecogranite.   
● Dir Group 
The volcano-sedimentary rocks are exposed in the western KIA around Dir and 
Swat areas. These were named as Dir group. This group further divided into 
three units from base to top. These are Baraul Banda slate, Dir-Utror volcanic 
series and the Panakot meta-arkose.  
● Chilas Complex 
Chilas complex is representing the southern part of KIA and consisting mainly 
of pyroxenediorites and gabbronorites with minor amount of gabbros, 
anorthosites, troctolites, peridotites, dunites, and mafic dykes. In the southern 
part of KIA, this complex is extending 300km along eastwest and 40km along 
north-south. The rock group present in this extensive complex are in age from 
Late Jurassic to Cretaceous. In the southern part, Chilas complex has a tectonic 
contact with the Kamila/southern amphibolites.   
● Kamila Amphibolites 
The Kamila amphibolites belt lie south of the Chilas complex in the KIA and 
mainly consists of two varieties of amphibolites. One variety is medium to 
coarse-grained homogenous amphibolites while, the other one is fine- grained 
banded or homogenous amphibolites. Width of Kamila amphibolite is 10-40km 
and is present all along the southern Kohistan batholith. Structural data and 
their age (83-80Ma) suggest that the deformation and metamorphism occurred 
before the collision of the Kohistan island arc with the indian plate along indus 
suture zone. Main lithologies present in this sequence consist of meta-volcanic 
and meta-plutonic oceanic rocks. 
● Jijal Mafic-Ultramafic Complex 
Jijal complex, having basal cumulates, layered gabbro and ultramafic rocks lies 
in the southern part of KIA consisting of about 150km2 and represents the 
deepest part of the arc. Two distinct units in this complex are 1) ultramafic 
rocks, consisting of dunites, harzburgites, websterites, and clinopyroxenites and 
2) garnet granulite. 
3.   Executive Summary (Map of Applied Area) 
● Project Name:  Opposite Gupis Mine 
● Location: Gupis, Tehsil Yasin, District Ghizer, Gilgit-Baltistan 
● Size of Applied Area: 10 Sq/Km – 2,471 Acres 
Sr No. 
A  
Latitude 
36.264768°    
Longitude 
73.461140° 
B  
C  
D  
E  
36.254223°    
36.244428°    
36.233142°    
36.246712°    
73.495540° 
73.466853° 
73.459915° 
73.423405° 
● License Applied By: Earth Lux Mines & Minerals (Pvt) Ltd. 
● Report Date: June 09, 2024 
● Prepared by: Mr. Muhammad Iqbal (Geologist) 
● Purpose of the Report: To provide a detailed geological assessment of 
the copper mine, including exploration findings, secondary minerals, 
resource estimates, and recommendations for further development. 
4. Background:  
The Applied E/L is located in the Gupis, approximately 110 km North West of 
Gilgit City. The Applied E/L covers an area of 10 Sq/Km and hosts a polymetallic 
deposit with significant concentrations of Copper, Silica Quartz and Iron. This 
report summarizes the geological setting, exploration activities, and resource 
estimation conducted there. 
5. Introduction: 
The reconnaissance survey carried out by the team of geologists of Earth Lux 
Mines & Minerals (Pvt) Ltd. in Gupis on the basis of expert opinion of Mr. 
Muhammad Iqbal (Geologist). The Gupis Valley is surrounded by the towering 
peaks of the Hindu Kush Mountain Range, which lies to the west and 
northwest of the valley. On the opposite side of Gupis Village, the Karakoram 
Range begins to dominate the landscape to the east and northeast. The 
general plan of field survey was to confirm the presence of copper as well as 
silica-Quartz in the prospect area. The team of geologists conducted 
preliminary investigations in this area. Generally, the area comprised igneous 
rocks, including granite, andesite, breccias, and conglomerate. The ore body is 
exposed in the form of mineralized vein deposit with various thicknesses 
ranging from 1 feet to 6 feet with strike length 200m to 400m (approximately 
visually assessed) at different locations of the igneous rock from top to bottom. 
6. Topography & Features of Applied Area: 
Gupis Valley, located in the Yasin Tehsil of Ghizer District, Gilgit-Baltistan is a 
stunning valley nestled between the Hindu Kush and Karakoram mountain 
ranges. Situated at an elevation of 2,200 to 3,000 meters, the valley is 
characterized by its lush green terraced fields, crystal-clear Ghizer River, and 
panoramic views of snow-capped peaks. Inhabited by the Burusho and Wakhi 
communities, the valley boasts a rich cultural heritage, with traditional wooden 
houses and ancient forts like the Gupis Fort. Agriculture, including crops like 
wheat, barley, and fruits, and livestock farming are the main livelihoods. Known 
for its natural beauty and serene environment, Gupis Valley is a popular 
destination for tourists and serves as a gateway to nearby attractions such as 
Phander Lake and Shandur Pass. Accessible via the Karakoram Highway, the 
valley offers a perfect blend of adventure, culture, and breathtaking 
landscapes. 
7. Accessibility: 
Gupis is accessible from Gilgit city via Ghizer Expressway. The prospect area is 
located at a distance of 110 km from Gilgit City. The prospect area lies opposite 
of the main village of Gupis across the river. 
8. Google Earth Terrain Map: 
9. Mineralization: 
The prospect area is in Yasin District, which is rich in metallic and non-metallic 
minerals due to its geological setting in the Hindukush Mountain ranges. The 
district has significant igneous, metamorphic, and sedimentary rocks, which 
contribute to its mineral wealth. The prospect area exhibits mineralization in 
the form of, iron pyrite, copper & silica-quartz mineralization appears to be 
associated with the above minerals along the fractures and are disseminated. 
Several hydrothermal quartz and mineralized sulfide veins are common in the 
prospect area. In most of the area the deposit is in the form of pockets. The 
Copper vein in different locations varies from 0.6 feet to 5 feet with 3 to 5km in 
strike length. 
10. Field Visit / General Survey Activities: 
The company conducted work for demarcation of area to make exploration and 
mining of Copper & Silica-Quartz. The company has done wonderful progress 
in exploring and exposing the fresh outcrops of sulfide mineralization bearing 
Copper in this area. The sulfide mineralization bearing copper was observed 
mostly in the massive form with in metamorphic/Intrusive rock and partly 
secondary in the meta-volcanic up to an intermittent linear distance of about 1 
kilometer.   
Sample Collected:  
● Other potential areas, though yet to be fully assessed, showed 
promising geological characteristics indicative of high-value 
mineralization. Geological surveys indicate the presence of 
valuable minerals, with high-grade Sulfide Mineralization of 
Copper Ore concentrations suggesting commercial viability. 
Furthermore, the area's favorable geological formations and 
accessibility enhance its potential for sustainable mining 
operations. With further exploration and detailed feasibility 
studies, this site could become a significant contributor to the 
regional mining sector, fostering economic growth and 
employment opportunities.  
● Different samples (bulk, grab and chips samples) have been collected from 
proposed area in different points during field work for the chemical and 
industrial analysis proposes. 
11. Future Plan Development for Exploration Activities: 
Work Program 
Road 
The applied area is situated near the Main Ghizer Expressway, the remaining 
mine access and transport road will be constructed by the company.     
1st Year: (E/L) 
● After acquiring the Exploration License of the applied area, a detailed plan with 
reference to timeline, physical activities, practical engagement, geo-chemical 
and operational studies and finances will carried out.   
● Paying off Financial obligation/liabilities as per rules and regulations. 
● Forming, briefing and training of technical staff, launching/deploying the 
Geological team to respected area to conduct research-carry out field study.  
● Establishment of field (site) camps and link up with local authorities. 
Upon establishment of field camp/setup, link up with local community 
● Initial survey reconnaissance and mapping of the area using latest tools 
including GPS, Air Drones, Total Station Scopes and similar equipment for field 
exploration. 
● Site identification, conducting explosives blasts for ore sample collection 
(tagging & bagging) 
● Sending collected and tagged ore bags (float/chiseled/blasted) for Chemical 
Analysis at multiple laboratories.   
● Submission of Chemical Analysis reports to concerned authorities as per rules 
and procedures. 
2nd Year: (E/L) 
● Camping/Deployment, site marking with physical features, trails and waypoint 
direction (boards or signs) and launching of geological teams to respective 
areas for complete ground visit check and to conduct a thorough field 
exploration.   
● Deploying a secondary local team with panjor (petrol driven) hand rock drill 
machines and light explosives to conduct exploratory blasts at all marked 
leaching/sulphide zones. 
● Geophysical survey using electronic equipment (drones with GPS and high 
definition panoramic camera for grid mapping and detailed topo-contouring) 
for 3D Model printing. 
● Core drilling at identified sites with Shaw Core drill for core samples (02 inch”).    
● Re-assessing all the remaining mineralized point of occurrences in the license 
area. 
● Chemical analysis of the core samples using XRF, XRD & AAS methods.    
● Submission of reports to the concerned authorities as per rules & procedures. 
3rd Year:  
● Camping and launching of technical geological and mining engineering teams 
to respective area to determine resource estimation & average grade of ore 
content. 
● Technical and mining engineering teams to design and develop methods of 
mining, extraction of maximum probability areas in applied area with keep in 
view environmental safeguards and safety precautions at site.   
● Hydraulic Core drilling at initial drilling points in a grid-wise manner to establish 
a 3D Model design of ore body using Geovia Surpac Software along with ArcGIS 
mapping.    
● Commencing Work operations of Pitting, Trenching and Aditing at each site to 
be able to prepare point of entry (Portal) and extraction for mining lease 
operations.   
● Full workings of chemical analysis of core samples and exposed bulk sample to 
determine their values and profitability and practicality of mining operations at 
site.  
● Quantitative estimation of ore reserve and ore bodies by consultants and 
specialists.   
● Submission of reports as per requirements of the departmental authorities & 
procedure. 
Environmental & Safety Measures 
● Safety protocols for field and drilling operations 
● Community engagement and social responsibility initiatives 
Budget & Cost Estimation 
● Personnel & Labor Costs: Geologists, field technicians, drilling crews. 
● Equipment & Materials: Survey tools, drilling machinery, lab testing. 
● Logistics & Operations: Transportation, accommodation, fuel, permits 
● Total Estimated Budget: To be determined based on detailed planning 
Conclusion: The proposed exploration work program in Gupis, Tehsil Yasin, 
District Ghizer aims to systematically identify and evaluate mineral deposits 
while ensuring environmental sustainability and regulatory compliance. The 
successful execution of this program will provide valuable insights for potential 
mining operations. 
12. Detail of The Machinery/Equipment Available with 
Company (Acquirable if needed): 
Name of Items Type/Make Origin/Details Quantity 
Excavator Chain belt/Wheel Type EX-200 LC, EW-170 (Bit & 
Shovel) 
2 
Air 
Compressors 
Trolley Mounted, 3 Hoses Airman PDS-125, PDS-175 
Airman PDS-185, PDS-450 
8 
Motorized 
Winch 
Diesel Powered Locally Manufactured, KPK 2 
Tripod Winch Diesel Powered Engine 25 Feet Long Pole Legs, 20 Ton 2 
Pneumatic 
Hard Rock Drill 
Machines 
Y-Series (Y-18) (Y-20) (Y-22) 
Y- Series (Y-24) (Y-26) (Y-28) 
Swedish Cobra Rock Drills 
Chinese Y-Series For Hard Rock 
And Tunnel Mining. 
Swedish Cobra With Jackleg Drill 
16 
Drill Bits Different Sizes & Shapes 38mm-42mm (2 Sides & Cross) 40 Dozen 
Drill Rods Different  Lenghts & Types (3 Feet To 12 Feet) Length  
(Taper & Bit Rods) (Chinese) 
5 Dozen 
Steel Cable 
Wire 
1 Inch Thick Steel Core Wire Cable Wire Roll (1000m) Local 5 Rolls 
Tractor Trolley Millat 385 Tractor Trolley 
With Front End Shovel Hoe 
Local Manufactured, Semi-Used 
(Material & Machinery Haulage) 
4 
Vehicles Land Cruiser, Vigo, Corrolla, Company Management  Vehicles 4 
Tents & Sheds Hut Type,  Waterproof,  
Double-Ply Field Camp Etc. 
Chinese Origin, Locally 
Manufactured,  For Mining Sites 
15 
Steel Hopper Stainless Steel Hopper 
(10 Cubic Meters Capacity) 
For Raw Material Collection & 
For Controlled Processing Feed 
Of Ore 
2 
Jaw Crusher Primary Jaw Crusher For Ore 
Crushing & Grading 32”x24” 
Locally Manufactured Custom 
Made, With Carbon Steel Plates 
2 
Syndicator  Secondary Crusher Unit For 
Grit & Gravel Size Crushing 
30”x20” Custom Made With 
Carbon Steel Blades & Hammers 
2 
Conveyor Belts Conveyor Belt System For 
Material Transport Purpose 
24” Wide (300 Feet Long) 
Grooved Rubber Belt For 
Conveyor, Local 
1 
  Dump Truck Mine Mini-Dump Truck 
(20 Tons Carriage Capacity) 
Hino Company, (4x4) New 
Condition, Diesel Truck  
2 
Wheel Loader Komatsu EW-200 Front End 
Loader Machine For Mining 
Japanese Origin, Model 2012, 
Diesel Powered, Good Condition 
1
Generator Diesel Powered 100 KVA  
(Mine Site Power Supply) 
Cummins Company, Semi-Used 
Diesel Electric Generator For 
Mine 
1 
Small 
Generator 
Honda Alimax (15KVA) Petrol 
Powered Generator 
For Emergency Lighting & 
Equipment Utilization (Backup) 
1 
Solar Panels Solar Powered HD Panels 
With Complete UPS Setup 
For Mine Site Electricity 
Requirement & Power Source 
4 
13.  Company Staff: 
Project  Manager                01 
Project Deputy Manager              01 
Geologist     01 
Mining Engineer           01 
Geophysicist  01 
GIS Specialist   01 
Accounts Incharge         01 
Professional Drillers 06 
Camp Supervisor/NCO           02 
Drivers 03 
Cook  02 
Security-Guards                        02 
Field Assistant/Camp Site  02 
Labor Team/Wage Workers  40 
14. Approximate Expenditure For Development of Mining 
Activities For   Initial  First Three Years 
Description Cost in Million 
Purchase & Procurement of Equipment/Machinery + 
Items  
8.5 
Expenditure of Construction of Site Residence and 
Office   
2.0 
Construction of Road and Trial   15.0 
Cost of POL  1.5 
Construction of Mine Platforms, Pits, Face & Quarry 
Point                
2.0 
Platform Leveling, Concreting And Setup For Drilling 
Points         
1.0 
Hydrological Studies, Water Channel Assessment For 
Power          
0.5 
Extraction, Blasting, Collection, Tagging Of Bulk Samples 
For Mineral Processing & Metallurgical Separation 
Studies Etc.            
2.0 
Shallow Depth/ Near Surface Core Drilling (Grid Wise)  
1.0 
Metallurgical & Processing Studies Cost & Other 
Expenses 
1.0 
Additional Geological Survey In The Nearby Adjacent 
Areas.  
1.0 
Social & Economic Uplift Of The Local Community 
(Works)   
1.0 
Cost for Salary of Staff and Technical Consultants 
3.0 
Costs For Hotels, Accommodations For Foreign 
Consultants   
1.0 
Costs For Vehicles Rentals , Fuels, Maintenance & 
Guests.  
1.5 
Miscellaneous  Charges & Unforseen Expenses   
1.0 
Total Cost In Millions (PKR) 
43.0 
29
`}
]

export const news: NewsArticle[] = [
  {
    id: 'untapped-potential-copper-mining-gilgit-baltistan',
    title: 'The Untapped Potential of Copper Mining in Gilgit-Baltistan',
    excerpt: 'In October 2025 a shipment left Pakistan carrying copper concentrate, antimony and rare earths, bound for the United States. Two very different buyers, one shared shopping list, and copper sits on both.',
    content: 'In October 2025 a shipment left Pakistan carrying copper concentrate, antimony and rare earth elements, bound for the United States. It was the first delivery under a $500 million partnership signed a month earlier between Pakistan and US Strategic Metals, a framework covering the whole chain from exploration through to refining.\n\nAround the same window, Saudi Arabia was pursuing a 15 percent stake in Reko Diq, Pakistan\'s flagship copper-gold project in Balochistan, backed by a reported $540 million commitment. Two very different buyers, arriving from two very different directions, with one item in common near the top of the list. Copper.\n\nNeither deal touches Gilgit Baltistan, and it is worth saying that plainly rather than letting the association do quiet work in the background. What the region does have is the same commodity under licence: copper with a gold indication at both Kharmang and Shigar. The geological basis for that is not ours to claim credit for. Regional surveys have logged anomalous copper, gold, platinum and silver values in gossan and iron-oxide zones along the Karakoram Suture, the structural belt both concessions sit inside. That is a mapped corridor in published literature, not a hopeful reading of our own ground.\n\nThe demand story is real enough. Electrification, EV batteries and grid rebuilds have pushed copper into a position where supply, not appetite, is the constraint, which is a large part of why Pakistan is fielding nine-figure interest from Washington and Riyadh at all. The question that gets less airtime is where the next tranche of that supply actually comes from, and whether it arrives with a licence attached. Surveyed concessions with published area and status are one answer. Unlicensed extraction is the other, and it is the one buyers increasingly cannot accept.\n\nFull geological and assay detail for both sites goes to verified investors through the investor desk. The public summaries live on the Shigar Copper Deposit and Kharmang concession pages.',
    imageUrl: '/blogs/b1.jpeg',
    publishDate: '2026-01-20T12:00:00Z',
    companyId: 'earth-lux-mines',
  },
  {
    id: 'sustainable-gemstone-mining-northern-pakistan',
    title: 'Unearthing Beauty: Sustainable Gemstone Mining in Northern Pakistan',
    excerpt: 'Ruby and building marble can come out of the same rock. That is not a quirk of geography, it is the geology, and it shapes what our Bagicha concession in Skardu can actually sell.',
    content: 'Ruby and building marble can come out of the same rock. That is not a quirk of geography, it is how the mineral forms. Gem-quality corundum grows inside metamorphosed dolomitic marble, which means a single formation can hold something a jeweller wants and something a quarry wants, sitting metres apart.\n\nThis is well trodden ground in the literature rather than a claim we invented. Published surveys describe a dolomitic marble sequence running for tens of kilometres along the Main Karakoram Thrust, with ruby-bearing marble reported at several points along it, and the wider Shigar and Skardu corridor has a long recorded history of pegmatite and gemstone recovery. Our Bagicha concession in Skardu district sits inside that belt.\n\nWhat that means commercially is that Bagicha is not a single-product site. Across roughly 20 sq/km it carries ruby gemstones, snow white marble, quartz and lithium-bearing indications, which is a mixed profile typical of this geology. It supports two quite different buyers from one licence: a gem dealer looking for rough ruby, and a stone buyer looking at marble and quartz as their own products entirely.\n\nThailand is one of the more natural markets for the gem side. It is a global hub for coloured stones and finished jewellery, and already a primary export destination for Pakistani gems alongside Sri Lanka and Western Europe. Most buyers in that category are used to working through one or more intermediary layers between the mine and the cutting floor. A direct relationship with a licensed source removes them, which is worth more to some buyers than any discount.\n\nAssay work, boundary data and the full geological report stay with verified buyers through the investor desk rather than sitting on a public page. What is public is on the Bagicha concession page and the quartz and silica commodity page.',
    imageUrl: '/blogs/b2.jpeg',
    publishDate: '2026-01-27T09:00:00Z',
    companyId: 'durr-zircon',
  },
  {
    id: 'strategic-importance-silica-quartz-iron-ore',
    title: 'Beyond the Surface: The Strategic Importance of Silica Quartz and Iron Ore',
    excerpt: 'Every solar panel starts as silica pure enough that most deposits do not qualify. That is the interesting part of this story. The iron ore part is less interesting than the industry usually pretends.',
    content: 'Every solar panel starts as silica, and the catch is purity. The photovoltaic and semiconductor industries need feedstock clean enough that most deposits simply do not qualify, which is why buyers in this category open the conversation by asking for an assay rather than a price. Our Bagicha concession in Skardu carries quartz alongside that site\'s ruby, marble and lithium-bearing indications, and that assay question is the whole negotiation.\n\nNow the less flattering half of the usual version of this article. Regional write-ups tend to pair silica with iron ore as twin industrial pillars, and we should be straight about where we actually stand on the second one. Iron shows up at our polymetallic concessions, Kharmang and Hilal Abad both carry it alongside copper and silver. But neither we nor most operators in this district run iron as a standalone export line the way copper or antimony are genuinely marketed. It is a useful geological signal inside a polymetallic structure. It is not yet a product with a buyer attached.\n\nSaying otherwise would pad the list at the cost of being trusted on the rest of it. Gilgit Baltistan\'s near-term export strength is narrower and more specific than the brochure version: copper and gold at Shigar and Kharmang, antimony at Gultari and Gojal, placer gold at Skardu, quartz and gemstones at Bagicha, granite and marble at Gupis and Ishkoman. Iron belongs inside that picture as context, not as a seventh line item.\n\nThe silica opportunity does not need the padding. Solar manufacturing capacity is being built out across Pakistan and the wider region, and high-purity local supply is a strategic input rather than a commodity trade. Assay reports and trade documentation for Bagicha go to verified buyers through the investor desk, with general specifications on the quartz and silica commodity page.',
    imageUrl: '/blogs/b3.jpeg',
    publishDate: '2026-02-03T14:00:00Z',
    companyId: 'earth-lux-mines',
  },
  {
    id: 'resurgence-placer-gold-panning-gilgit-baltistan',
    title: 'Glacial Gifts: The Resurgence of Placer Gold Panning in Gilgit-Baltistan',
    excerpt: 'The Indus has been doing the mining for millions of years. It cuts through gold-bearing rock upstream and drops the results where the current slows, which is roughly where our 26 km Skardu concession sits.',
    content: 'The Indus has been doing the mining here for millions of years. It cuts through mineral-rich tectonic zones upstream, erodes gold out of the source veins, carries the pieces downstream and drops them wherever the current slows enough to let go. That process is what placer gold is, and it is one of the better-documented mineral occurrences in the region: published research confirms recovery by panning, screen-washing and drilling along river sediments through Chilas, Gilgit, Skardu and Chitral.\n\nSkardu is a good place to be standing when that happens. It sits at the confluence of the Shigar River with the Indus, and confluences are where a river loses velocity and deposits what it has been carrying. That is a large part of why our licensed concession there runs along a 26 km stretch of riverbed rather than a single narrow claim, and why the gold turns up in black sand deposits at a scale that supports mechanized recovery rather than the hand panning that has supported families along these rivers for generations.\n\nCommercially this is a genuinely different animal from the rest of the portfolio, not a smaller version of it. There is no shaft to sink and no pit to strip before anything comes out, so placer operations are typically lower capex and reach cash flow faster than hard rock mining. An investor weighing Skardu against, say, Shigar is choosing between two different risk and timeline profiles rather than two sizes of the same bet. Gold does also appear as a secondary indication alongside copper at Hilal Abad and Shigar, but that is a separate and much longer horizon.\n\nRiverbed access, recovery-rate data and licence documentation go to verified investors through the investor desk. The public summary is on the Skardu placer gold concession page.',
    imageUrl: '/blogs/b4.jpeg',
    publishDate: '2026-02-10T10:00:00Z',
    companyId: 'durr-zircon',
  },
  {
    id: 'geology-shigar-copper-gold',
    title: 'Exploring the Geology of Shigar Copper and Gold Potential',
    excerpt: 'The Shigar valley runs along a seam where two continents collided. Geologists have a name for what tends to collect along seams like that, and surveys next door have already found it.',
    content: 'The Shigar valley runs along a seam where two continents met. The Main Karakoram Thrust, which the valley follows, is the boundary between the Asian plate to the north and the Kohistan-Ladakh plate to the south, and collision zones like it are where regional geologists expect base and precious metals to concentrate. That is the setting. The interesting part is what has actually been found in it.\n\nSurveys of the Shigari Bala area, a catchment in Skardu district immediately next door to Shigar, have reported anomalous gold, platinum, silver, bismuth, copper, lead, zinc, cobalt and molybdenum values, tied to gossan and iron-oxide zones along the Karakoram Suture. That is the same structural belt our Shigar concession sits inside. None of that data is ours. It exists in published survey literature independently of anything on this website, which is precisely what makes it worth citing.\n\nThe timing has become more relevant than it was a year ago. Copper with gold is exactly the pairing behind Pakistan\'s two largest mineral deals of 2025: the $500 million US Strategic Metals partnership, and Saudi Arabia\'s pursued stake in Reko Diq, itself a copper-gold project. Shigar is not part of either. It is the same commodity category at a considerably earlier stage, which is a different proposition and should be evaluated as one.\n\nWhat that adds up to for an investor is a shorter leap of faith than most early-stage assets ask for. The regional evidence points at this stretch of ground before anyone from our side says a word about it. Full structural mapping and assay results for the concession itself go to verified investors through the investor desk once an enquiry is confirmed, and licence status, area and mineral indications are summarised on the Shigar Copper Deposit page.',
    imageUrl: '/blogs/b5.jpeg',
    publishDate: '2026-04-10T10:00:00Z',
    companyId: 'durr-zircon',
  },
  {
    id: 'geological-importance-hilal-abad',
    title: 'Unearthing the Polymetallic Potential of Hilal Abad',
    excerpt: 'Polymetallic is a plain word for a useful situation: you are never mining just one thing. At Hilal Abad that means copper, iron, silver and gold in the same structure, and an exploration licence rather than a mine.',
    content: 'Polymetallic is a plain word for a useful situation. You are never mining just one thing, which changes the economics: a grade that would be marginal for a single metal can work when three others come up the shaft with it. Filings for Hilal Abad describe copper, iron, silver and gold together, a combination that is common in Kharmang district geology and worth explaining rather than just listing on a spec sheet.\n\nThe district around it has been surveyed more than once, and for good reason. Regional surveys report high-grade antimony occurrences in the Kharmang and Astak area specifically, at concentrations between 50 and over 80 percent at surveyed showings. Hilal Abad is not an antimony licence itself, and we are not going to imply that those numbers belong to it. The point is narrower and still useful: this stretch of Kharmang keeps appearing in the literature, which is a different thing from a single isolated claim that nobody has looked at twice.\n\nIt is also worth being clear about what stage this is. Hilal Abad is held under an exploration licence, not a mining lease. The near-term work is confirmatory, more mapping and sampling ahead of any future lease application, not extraction. Across 9.97 sq/km that is an entirely normal place for a site to be, and it happens to be the stage where geological documentation carries the most weight for a partner deciding whether to fund the next phase.\n\nThat documentation goes to verified investors once an enquiry is confirmed through the investor desk. Licence status and mineral indications are summarised on the Hilal Abad concession page.',
    imageUrl: '/blogs/b6.jpeg',
    publishDate: '2026-04-12T10:00:00Z',
    companyId: 'durr-zircon',
  },
  {
    id: 'pakistan-us-critical-minerals-partnership',
    title: 'What the $500 Million Pakistan-US Minerals Deal Means for Gilgit Baltistan',
    excerpt: 'US Strategic Metals and Pakistan signed a framework in September 2025 covering exploration through refining. The first shipment, in October 2025, was antimony, copper concentrate and rare earths, the same commodities held under licence across our own concessions.',
    content: 'In September 2025, Pakistan and US Strategic Metals signed two memoranda of understanding covering the full mineral value chain, from exploration through refining, backing a $500 million partnership framework. The first shipment moved in October 2025: antimony, copper concentrate, and rare earth elements including neodymium and praseodymium. The US side has been explicit about why: reducing dependence on a small number of existing suppliers for materials it considers critical to national security, clean energy, and advanced manufacturing.\n\nWhat makes this relevant to Gilgit Baltistan specifically is the commodity list. Antimony, copper, and gold, three of the minerals this partnership is built to develop and refine domestically rather than export as raw ore, are exactly what several of our own licensed concessions carry. Gultari and the Gojal tehsil of Hunza hold our antimony, Shigar and Kharmang carry copper alongside a gold indication, and Skardu holds a licensed placer gold operation. None of that is coincidence: the same geology that put Gilgit-Baltistan on the map for these minerals is what drew a $500 million US partnership to Pakistan in the first place.\n\nFor a US investor, that partnership is a live, government-backed precedent rather than a speculative pitch. It also raises the practical question of where the next tranche of that supply actually comes from. Licensed, surveyed concessions with published area and licence status, rather than unlicensed artisanal extraction, are the more straightforward answer, and it is the model our concessions are built on. More detail on how a US company would actually structure a position is on our United States market page.',
    imageUrl: '/images/commodities/copper.webp',
    publishDate: '2026-08-10T10:00:00Z',
    companyId: 'durr-zircon',
  },
  {
    id: 'saudi-reko-diq-gilgit-baltistan-copper-gold',
    title: 'Saudi Arabia\'s Reko Diq Stake and What It Signals for Northern Pakistan\'s Copper-Gold Belt',
    excerpt: 'Saudi Arabia is pursuing a 15% stake in Pakistan\'s Reko Diq copper-gold project, backed by a reported $540 million commitment. Our Shigar and Kharmang concessions carry the same commodity pairing, at a much earlier stage.',
    content: 'Saudi Arabia\'s own mining sector had a record 2025: exploitation licences up 220 percent domestically and investment reaching $11.7 billion. That appetite has extended into Pakistan directly. The Kingdom has pursued a 15 percent stake in Reko Diq, Pakistan\'s copper-gold project in Balochistan, backed by a reported $540 million commitment, and the Saudi Fund for Development has signalled it may put over $100 million more into Pakistani mining infrastructure. Broader estimates put combined Saudi and UAE investment interest in Pakistan as high as $50 billion over five years, with mining one part of that.\n\nReko Diq is a copper-gold deposit at a scale most projects never reach: an estimated 5.9 billion tonnes of ore and a projected mining life of at least 40 years. Our own Shigar concession carries the same commodity pairing, copper ore with gold as a strong secondary indication, in the same Karakoram (Shyok) Suture structural belt that regional surveys have logged anomalous gold, platinum, silver, and copper values along. Kharmang, in the same district, adds copper, iron, and silver in a documented antimony corridor. Neither is Reko Diq in scale. Both sit in the same commodity category that just drew a nine-figure Saudi commitment.\n\nWhat that tells a Saudi investor is less about any single deal and more about risk appetite: Saudi capital is already comfortable underwriting Pakistani copper-gold mining risk at scale. An earlier-stage, licensed concession in the same commodity pairing is a different point on the same curve, not a different asset class. More on how that would actually be structured is on our Saudi Arabia market page.',
    imageUrl: '/images/commodities/gold.webp',
    publishDate: '2026-08-14T10:00:00Z',
    companyId: 'durr-zircon',
  }
];


const companies: Company[] = companiesData.map(company => ({
  ...company,
  // Add documents to the company based on companyId
  documents: [
    ...(company.documents || []),
    ...allDocuments.filter(doc => doc.companyId === company.id)
  ]
}));

export async function getCompanies(): Promise<Company[]> {
  // This function simulates fetching data. In a real app, this would be an API call.
  return companies;
}

export async function getCompanyById(id: string): Promise<Company | undefined> {
  const companies = await getCompanies();
  return companies.find((company) => company.id === id);
}

export async function getNews(): Promise<NewsArticle[]> {
  return news;
}

export async function getNewsById(id: string): Promise<NewsArticle | undefined> {
  const allNews = await getNews();
  return allNews.find((n) => n.id === id);
}

export async function getLatestNews(limit = 3): Promise<NewsArticle[]> {
  const allNews = await getNews();
  return [...allNews]
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, limit);
}

export async function getDocuments(): Promise<Document[]> {
  const companies = await getCompanies();
  return companies.flatMap(company =>
    company.documents.map(doc => ({ ...doc, companyName: company.name }))
  );
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return galleryImages;
}

