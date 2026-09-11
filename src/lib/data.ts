
import type { Company, NewsArticle, Document, GalleryImage } from '@/lib/types';
import { galleryImages } from '@/lib/gallery-images-data';
import { companies as companiesData } from '@/lib/companies-data';

/**
 * Client direction (2026-09-11): only the Incorporation Letters and the GB
 * Mineral Corridor Report stay publicly downloadable from /documents.
 * Everything else (geological reports, topography maps, the mining licence)
 * is confidential and should read "On request" instead. DocumentsTable
 * already implements that switch: url `'#'` (or unset) renders "On request",
 * any other url renders a Download button. So the fix here is data-only, not
 * a template change: set every non-exempt document's url to `'#'`.
 */
const allDocuments: Document[] = [
  { id: 'doc-gb-mineral-corridor-report', companyId: 'durr-zircon', title: 'GB Mineral Corridor Report 2026', type: 'Investor Report', url: '/reports/gb-mineral-corridor-report-2026.pdf' },
  { id: 'doc-zircon-geological-report', companyId: 'durr-zircon', title: 'Geological Report', type: 'Geological Report', url: '#' },
  { id: 'doc-1', companyId: 'durr-zircon', title: 'Copper Ore at Skardu,  Tehsil Gultari', type: 'Geological Report', url: '#' },
  { id: 'doc-7', companyId: 'durr-zircon', title: 'Marble Ore at Bagicha', type: 'Geological Report', url: '#' },
  { id: 'doc-2', companyId: 'durr-zircon', title: 'MINING LICENSE', type: 'License', url: '#' },
  {
    id: 'doc-8',
    companyId: 'earth-lux-mines',
    title: 'Incorporation Letter',
    type: 'License',
    // Self-hosted, view-only: see the access:'view' note on the Document
    // type. Mega link retired per client direction (2026-09-11).
    url: '/documents/earth-lux-incorporation-letter.pdf',
    access: 'view',
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
    url: '#',
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
    id: 'pakistan-us-critical-minerals-partnership',
    title: 'What the $500 Million Pakistan-US Minerals Deal Means for Gilgit Baltistan',
    excerpt: 'US Strategic Metals and Pakistan signed a framework in September 2025 covering exploration through refining. The first shipment, in October 2025, was antimony, copper concentrate and rare earths, the same commodities held under licence across our own concessions.',
    content: 'In September 2025, Pakistan and US Strategic Metals signed two memoranda of understanding covering the full mineral value chain, from exploration through refining, backing a $500 million partnership framework. The first shipment moved in October 2025: antimony, copper concentrate, and rare earth elements including neodymium and praseodymium. The US side has been explicit about why: reducing dependence on a small number of existing suppliers for materials it considers critical to national security, clean energy, and advanced manufacturing.\n\nWhat makes this relevant to Gilgit Baltistan specifically is the commodity list. Antimony, copper, and gold, three of the minerals this partnership is built to develop and refine domestically rather than export as raw ore, are exactly what several of our own licensed concessions carry. Gultari and the Gojal tehsil of Hunza hold our antimony, Shigar and Kharmang carry copper alongside a gold indication, and Skardu holds a licensed placer gold operation. None of that is coincidence: the same geology that put Gilgit-Baltistan on the map for these minerals is what drew a $500 million US partnership to Pakistan in the first place.\n\nFor a US investor, that partnership is a live, government-backed precedent rather than a speculative pitch. It also raises the practical question of where the next tranche of that supply actually comes from. Licensed, surveyed concessions with published area and licence status, rather than unlicensed artisanal extraction, are the more straightforward answer, and it is the model our concessions are built on. More detail on how a US company would actually structure a position is on our [United States market page](/markets/usa).',
    imageUrl: '/images/commodities/copper.webp',
    publishDate: '2026-08-10T10:00:00Z',
    companyId: 'durr-zircon',
  },
  {
    id: 'saudi-reko-diq-gilgit-baltistan-copper-gold',
    title: 'Saudi Arabia\'s Reko Diq Stake and What It Signals for Northern Pakistan\'s Copper-Gold Belt',
    excerpt: 'Saudi Arabia is pursuing a 15% stake in Pakistan\'s Reko Diq copper-gold project, backed by a reported $540 million commitment. Our Shigar and Kharmang concessions carry the same commodity pairing, at a much earlier stage.',
    content: 'Saudi Arabia\'s own mining sector had a record 2025: exploitation licences up 220 percent domestically and investment reaching $11.7 billion. That appetite has extended into Pakistan directly. The Kingdom has pursued a 15 percent stake in Reko Diq, Pakistan\'s copper-gold project in Balochistan, backed by a reported $540 million commitment, and the Saudi Fund for Development has signalled it may put over $100 million more into Pakistani mining infrastructure. Broader estimates put combined Saudi and UAE investment interest in Pakistan as high as $50 billion over five years, with mining one part of that.\n\nReko Diq is a copper-gold deposit at a scale most projects never reach, with reserves reported at 13.1 million tonnes of copper and 17.9 million ounces of gold and a mine life projected past three decades. Our own Shigar concession carries the same commodity pairing, copper ore with gold as a strong secondary indication, in the same Karakoram (Shyok) Suture structural belt that regional surveys have logged anomalous gold, platinum, silver, and copper values along. Kharmang, in the same district, adds copper, iron, and silver in a documented antimony corridor. Neither is Reko Diq in scale. Both sit in the same commodity category that just drew a nine-figure Saudi commitment.\n\nWhat that tells a Saudi investor is less about any single deal and more about risk appetite: Saudi capital is already comfortable underwriting Pakistani copper-gold mining risk at scale. An earlier-stage, licensed concession in the same commodity pairing is a different point on the same curve, not a different asset class. More on how that would actually be structured is on our [Saudi Arabia market page](/markets/saudi-arabia).',
    imageUrl: '/images/commodities/gold.webp',
    publishDate: '2026-08-14T10:00:00Z',
    companyId: 'durr-zircon',
  },
  {
    id: 'serpentine-nephrite-kharmang-hilal-abad',
    title: 'The Green Rock at Kharmang: Serpentine, Jade, and a Mineral Mars Rovers Look For',
    excerpt: 'Serpentine turns up across both of our Kharmang licences, Hilal Abad and Mahdi Abad, alongside nephrite jade. It forms through a reaction that makes hydrogen out of rock and water, which is why NASA instruments have spent years hunting for it on Mars.',
    content: 'Our field teams keep coming back from Kharmang with the same rock in their hands. It is green, sometimes waxy, sometimes fibrous, and it turns up across both of our licences there: Hilal Abad and Mahdi Abad. The rock is serpentine, and its story runs a long way past the valley it came from.\n\nSerpentine is less a single mineral than a family of them, and the way it forms is the interesting part. Deep rock rich in olivine and pyroxene meets water. The water does not simply wet the rock, it reacts with it, restructuring those minerals into something new and releasing hydrogen as it goes. Geologists call the process serpentinization. It is one of the few natural reactions that manufactures hydrogen from nothing more than rock and water.\n\nThat detail is why serpentine has an audience well outside mining. Hydrogen can feed certain kinds of microbial life. So when scientists look for places where life could plausibly have started, serpentine is one of the things they look for.\n\nThey have been looking on Mars. Researchers mapping magnesium-rich serpentine across the planet using data from the Compact Reconnaissance Imaging Spectrometer for Mars, the orbital instrument known as CRISM, identified it across 43 separate images in work published in Geophysical Research Letters in 2025. Those deposits sit in Noachian and Hesperian terrain, which is to say the oldest rock Mars still has, and their presence implies serpentinization was running there early in the planet\'s history. More recently the SuperCam instrument aboard the Perseverance rover picked out magnesium serpentine at three separate points along its traverse through Jezero crater: the Amalik outcrop, the Falcon Lake boulder field, and a spot the science team called Tablelands.\n\nNone of that makes the Kharmang rock extraordinary. It makes it familiar. The same reaction that left serpentine in a Baltistan valley left it in a Martian crater, and one of the most expensive machines ever landed on another world was built in part to go and find it.\n\nThere is a second reason we pay attention when serpentine appears, and this one is commercial. Nephrite jade tends to form near serpentinite, usually along contact zones where serpentinised rock meets something else. The two travel together. So when a licence produces serpentine, jade stops being a hopeful thing to look for and becomes a reasonable one. Both Hilal Abad and Mahdi Abad have produced both.\n\nIt is difficult to hold a piece of this rock and not think about how old the transaction is. The Quran describes what the earth holds in close to those terms, as provision placed rather than luck stumbled upon. Iron is named directly: "And We sent down iron with its great might, benefits for humanity" (Al-Hadid 57:25, in the translation of Dr. Mustafa Khattab). Copper appears beside it in the account of Dhul-Qarnayn sealing a mountain pass, where the instruction is to bring blocks of iron and then molten copper to pour over them (Al-Kahf 18:96). Serpentine is named nowhere in the text, and we are not going to pretend otherwise. What is named is the principle: that metal and stone in the ground are a benefit set there on purpose, and that working them is ordinary, honourable human labour rather than a trespass. For anyone mining in a Muslim society, that is not decoration on a company page. It is the baseline the work sits on.\n\nWhich brings us to the least romantic and most important fact about these two licences. You can drive to them. Road access reads like a footnote until you cost a project without it. Helicopter-supported exploration in the Karakoram can eat a budget before a single tonne of material moves. A licence a truck can reach changes the arithmetic on sampling, on bulk testing, and eventually on shipping anything at all. Hilal Abad and Mahdi Abad both have it.\n\nThe field identification of serpentine and nephrite at both sites is our own. The laboratory work behind it, along with boundary data and the full geological reporting, goes to verified investors and buyers through the investor desk rather than onto a public page. What is public sits on the [Hilal Abad concession page](/concessions/hilal-abad-polymetallic-complex), the [Mahdi Abad Kharmang concession page](/concessions/kharmang-polymetallic-structure), and the [nephrite jade commodity page](/commodities/nephrite-jade).',
    imageUrl: '/images/nephrite-1.jpg',
    publishDate: '2026-09-08T09:00:00Z',
    companyId: 'zircon-mines',
  },
  /*
   * Q&A articles, Sept 2026. Each `## ` block is a question heading (see
   * lib/article-blocks) and also feeds FAQPage schema on the article page.
   * Written as the answers we actually give investors on calls, including the
   * cautious parts. Every figure is sourced in the text; nothing here claims a
   * resource, grade or ownership right that the sources do not support.
   */
  {
    id: 'best-mining-investment-opportunity-gilgit-baltistan-pakistan',
    title: 'Best Investment Opportunity in Gilgit Baltistan, Pakistan: What Foreign Investors Ask Us',
    excerpt: 'The questions foreign investors actually ask us about mining in Gilgit Baltistan, Pakistan, answered plainly, including the parts that should make you cautious.',
    content: [
      "Most of what gets written about investing in Pakistan's minerals is either a government brochure or a warning. We sit somewhere in the middle. We hold ten licensed blocks in Gilgit Baltistan, so obviously we think the region deserves your time, but we also take the calls where investors ask the uncomfortable questions. These are those questions, with the answers we actually give.",
      "## Why do people call Gilgit Baltistan the best mining investment opportunity in Pakistan?",
      "Mostly because of how little of it has been touched. The region's mines department puts its mining area at more than 43,000 square kilometres, and its Secretary of Minerals, Shahzeb Sheikh, said in February 2026 that much of it is still unexplored. About 1,840 square kilometres is under exploration licence and around 898 square kilometres under mining lease. That is roughly six percent of the ground. In most mining regions the good ground was pegged decades ago. Here a lot of it is still open.",
      "The second reason is the mix. Copper, gold, antimony, lead, molybdenum, iron, nephrite jade, marble and granite all occur here. The same official figures put copper grades between 0.2 and 74 percent across nine valleys, and antimony between 50.4 and 81.5 percent at the better showings. Read the top of those ranges as individual samples, not deposits. The spread still tells you the geology is real.",
      "## Is the $8 trillion figure for Pakistan's minerals real?",
      "Not in any sense you should build a financial model on. Pakistan's government has valued its mineral resources at around $8 trillion. The Center for Strategic and International Studies, in an April 2026 analysis, pointed out that more than 95 percent of the country's mineral terrain is underexplored and that no internationally certified reserve estimates exist. So the honest version is this: the potential is large, the proof is thin, and anyone quoting you a trillion dollar number is selling something. Judge a specific block on its own evidence.",
      "## Can a foreigner own a mine in Pakistan?",
      "Not directly. Under the Gilgit-Baltistan Mining Concession Rules, a mineral title can only be granted to a company incorporated in Pakistan. In practice foreign investors come in one of three ways: a joint venture with a company that already holds the licence, a farm-in where you fund exploration in exchange for a share, or a Pakistani subsidiary that applies for its own title. Most choose one of the first two, because the ground is already permitted and the community agreements are already signed. Each route is explained on our [investment routes page](/invest).",
      "## Is it safe to invest in Gilgit Baltistan?",
      "This is the question that matters most, so here is the careful answer. The security risks that dominate coverage of Pakistani mining are concentrated in Balochistan, where headline projects such as Reko Diq sit. CSIS noted in 2026 that terrorism there runs at about seven times the national average. Gilgit Baltistan is a different territory with a different risk picture, and the same valleys we work in host foreign climbers and trekkers every season. That does not make it risk free, and you should run your own assessment. For site visits we arrange the NOCs and security permissions ourselves, so you are not doing it alone.",
      "## What is the government doing to attract mining investment?",
      "More than it was five years ago. The Special Investment Facilitation Council was set up in 2023 to bring in foreign investment by cutting across ministries. In 2025 Pakistan announced a National Minerals Harmonisation Framework meant to standardise rules between provinces, simplify licensing and add tax incentives. The catch, which CSIS also flagged, is that each province has to adopt it before it means much on the ground. Large international deals are happening regardless: a $500 million partnership with US Strategic Metals signed in September 2025, and Saudi Arabia pursuing a 15 percent stake in Reko Diq. What those deals mean for the north is on our [United States](/markets/usa) and [Saudi Arabia](/markets/saudi-arabia) pages.",
      "## What can I actually invest in here?",
      "With us, four things. You can buy material: we quote copper, nephrite jade, placer gold, antimony, lead, quartz and granite FOB Karachi or CIF. You can take a joint venture or farm-in position in a specific licensed block. You can buy equity in the consortium. Or you can buy a whole company, because Earth Lux Mines & Minerals, which holds our Jutial Nala and Gupis blocks, is offered for outright acquisition. Every block, with its stage and area, is listed on the [concessions page](/concessions).",
      "## Which blocks are producing and which are early stage?",
      "Four of our ten are in operation. Hilal Abad in Kharmang produces premium nephrite jade alongside serpentine and copper, and the deposit is reachable by road. Bagicha in Skardu has copper with the vein exposed at surface, plus marble. Our placer gold licence runs 26 kilometres along the Skardu road. Jutial Nala near Gilgit city carries copper veins and lead. The other six, including Askoli in Shigar and Gultari, are at exploration stage, which means a cheaper entry and more geological risk. Neither is better. They suit different investors.",
      "## Why does road access matter so much?",
      "Because in the Karakoram, access is a cost line. A block you can only reach on foot or by helicopter can burn through an exploration budget before any material moves. A block a truck can reach changes the cost of sampling, bulk testing and eventually shipping. Hilal Abad, Mahdi Abad, Bagicha and the Skardu placer licence all have it. When you compare opportunities in Gilgit Baltistan, ask about access before you ask about grade.",
      "## How do I check that a mining company in Gilgit Baltistan is genuine?",
      "Ask for the licence stage and number, and the incorporation certificate behind it. Ask whether the grades come from an independent laboratory or from the operator's own estimate, and ask to take split samples for your own assay. Ask to see signed community agreements rather than assurances that relations are good. There is a longer checklist in our guide to [mining companies in Gilgit Baltistan](/guides/mining-companies-gilgit-baltistan), and it applies to us as much as to anyone.",
      "## How do I start?",
      "Send a note through the [investor desk](/investor-desk) saying what you are after: material, a stake in a block, or a whole company. We share boundary coordinates, geological reports and assay data after an NDA, and we can arrange a site visit with the permissions handled. The serious conversations usually start with one block and one question, not a request for everything at once.",
    ].join('\n\n'),
    imageUrl: '/blogs/b1.jpeg',
    publishDate: '2026-09-10T08:00:00Z',
    companyId: 'durr-zircon',
  },
  {
    id: 'mines-of-gilgit-baltistan-pakistan-minerals-guide',
    title: 'Discover the Mines of Gilgit Baltistan, Pakistan: Every Major Mineral and Where It Is Found',
    excerpt: 'Copper, gold, silver, iron, nephrite, antimony and more: where each is found in Gilgit Baltistan, how it compares with the rest of Pakistan, and which blocks hold it.',
    content: [
      "If you are trying to work out what is actually in the ground in Gilgit Baltistan, most sources give you either one mineral or a long list with no locations. This is the version we wish we had when we started: each mineral, where it turns up in the region, how it fits into Pakistan's wider picture, and which of our own licensed blocks carry it. The regional figures come from the Gilgit Baltistan Secretary of Minerals, Shahzeb Sheikh, speaking in February 2026.",
      "## What minerals are found in Gilgit Baltistan?",
      "The short list is copper, gold, silver, iron, lead, antimony, molybdenum, nephrite jade, serpentine, marble, granite, quartz and ruby, with a long tail of other gemstones and lithium indications in places. The region has more than 43,000 square kilometres of mining area and much of it is unexplored, which is why new occurrences still turn up every season.",
      "## Where is copper found in Gilgit Baltistan and Pakistan?",
      "In Gilgit Baltistan the mines department lists copper in at least nine valleys: Ishkoman, Teru, Chalt, Yasin, Skardu, Shigar, Nagar, Diamer and Misgar, at grades between 0.2 and 74 percent. The top of that range is individual samples rather than a deposit average. Pakistan's large copper projects are further south, at Reko Diq and Saindak in the Chagai district of Balochistan, and that is where most national copper headlines come from. The north is earlier stage and more spread out. On our registry, copper shows up at Hilal Abad, Mahdi Abad, Bagicha (where the vein is exposed at surface), Jutial Nala, Askoli in Shigar, Gultari and Gupis. Supply terms are on the [copper page](/commodities/copper-concentrate).",
      "## Is there gold in Gilgit Baltistan?",
      "Yes, in two very different forms. Placer gold sits in river sand, and the mines department says almost every river and stream in the region carries some. Hard-rock gold sits in ore, usually alongside copper. Placer is the quick one: washing and concentration instead of drilling and milling. Hard rock takes longer and can be much larger. Our [placer gold licence](/commodities/placer-gold) covers 26 kilometres of riverbed along the Skardu road and is producing, while our hard-rock gold at Askoli and Gultari is at exploration stage and covered on the [gold page](/commodities/gold). There is more in our piece on [placer gold mining in Pakistan](/news/placer-gold-mining-pakistan-gilgit-baltistan).",
      "## Where is silver found in Gilgit Baltistan?",
      "Silver here mostly travels with other metals rather than forming deposits of its own. It shows up alongside copper and lead in polymetallic ground. On our registry that means Jutial Nala near Gilgit, where it sits with copper veins and lead, and the Mahdi Abad block in Kharmang. For a buyer, silver in this region is usually a credit inside a lead or copper concentrate, not a separate product.",
      "## Is there iron ore in Gilgit Baltistan?",
      "Yes. The mines department reports iron at between 1 and 60.9 percent in Ishkoman, Sadpara, Chalt and Kharmang. Iron is a bulk commodity, so what makes or breaks it is transport cost, and that is where road access decides almost everything. Our Mahdi Abad block in Kharmang carries iron alongside copper, silver and serpentine.",
      "## Where does nephrite jade come from in Pakistan?",
      "Gilgit Baltistan is the main source, with nephrite recorded in Ghizer and Kharmang among other places. Nephrite tends to form beside serpentinite, so where you find serpentine, nephrite becomes a sensible thing to look for. That is exactly how it went at our Hilal Abad block, where premium nephrite is now the main target. People who have handled nephrite for more than two decades have signed off on the Hilal Abad samples, and they have passed with buyers in China too. We have also recovered first nephrite samples at Mahdi Abad. Terms are on the [nephrite jade page](/commodities/nephrite-jade), and the geology is in our story on [serpentine and jade at Kharmang](/news/serpentine-nephrite-kharmang-hilal-abad).",
      "## Where is antimony found in Pakistan?",
      "Gilgit Baltistan holds some of the highest-grade antimony in the country. The mines department lists showings of 50.4 to 81.5 percent at Darkot, Chupurson, Kharmang and Astak. Antimony is a critical mineral used in flame retardants, batteries and semiconductors, and it was part of the first shipment under the Pakistan and US Strategic Metals partnership in October 2025. Our antimony sits at Gultari, Gojal in Hunza and Ishkoman. Terms are on the [antimony page](/commodities/antimony-concentrate).",
      "## What about lead, molybdenum and lithium?",
      "Lead is recorded at Tangir, Kargah, Shigar and Skardu, and our blocks carry it at Jutial Nala, Gultari and Askoli in Shigar. Molybdenum occurs in Hunza, Skardu, Chilas and Astore, and we have indications at Gojal and Gultari. Lithium is the one people ask about most and the one we are most careful with. We have indications at Bagicha and Askoli, not a defined resource, and we will not describe it as more than that until the assays say otherwise.",
      "## Which marble, granite and gemstones come from Gilgit Baltistan?",
      "Dimension stone is one of the region's steadier businesses. White marble runs along a belt through Ghizer, and granite is quarried for construction and cladding. Our Gupis, Ishkoman and Bagicha blocks carry granite and marble, including snow white marble at Bagicha. Gemstones are the region's oldest trade, and at Bagicha ruby comes out of the marble alongside quartz. Stone supply is covered on the [granite and marble page](/commodities/granite-dimension-stone).",
      "## What is serpentine and why does it matter?",
      "Serpentine is a green rock that forms when water reacts with deep, olivine-rich rock, and the reaction gives off hydrogen. That is why instruments on Mars have been used to look for it. For a miner it matters for a more practical reason: it points toward nephrite. We have found it at both Hilal Abad and Mahdi Abad in Kharmang.",
      "## Who holds the mining licences in Gilgit Baltistan?",
      "The Mines and Minerals Department keeps a public register of title holders, with close to 500 entries across the region. Our own ten blocks are held by three registered companies: Durr Mines and Minerals, Zircon Mines, and Earth Lux Mines & Minerals. Every block, with its stage, area and holder, is on the [concessions page](/concessions), and our guide to [mining companies in Gilgit Baltistan](/guides/mining-companies-gilgit-baltistan) explains how licences work here.",
      "## Is Gilgit Baltistan better than the rest of Pakistan for mining?",
      "It depends on what you want. Balochistan has the giants, Reko Diq and Saindak, and also the security problems that dominate the headlines. Khyber Pakhtunkhwa has gemstones, some placer gold and industrial minerals. Gilgit Baltistan has the widest spread of metals and stone in a single region, the least explored ground, and a security picture that is generally calmer than Balochistan's, though not risk free. For an investor who wants early access to underexplored ground rather than a small stake in a giant project, the north usually fits better. Our piece on [investing in Gilgit Baltistan](/news/best-mining-investment-opportunity-gilgit-baltistan-pakistan) goes through the practical questions.",
    ].join('\n\n'),
    imageUrl: '/images/gilgit-map-zoom.jpg',
    publishDate: '2026-09-10T09:00:00Z',
    companyId: 'durr-zircon',
  },
  {
    id: 'placer-gold-mining-pakistan-gilgit-baltistan',
    title: 'Placer Gold Mining in Pakistan and Gilgit Baltistan: How It Works and Where the Gold Is',
    excerpt: 'Where placer gold is found in Pakistan and Gilgit Baltistan, how it is mined today, why most of it is still done by hand, and what a modern operation looks like.',
    content: [
      "Stand beside almost any river in Gilgit Baltistan for long enough and you will see someone washing sand for gold. It is one of the oldest jobs in the Karakoram. It is also, commercially, one of the least developed. Here is what placer gold mining in Pakistan actually involves, where the gold is, and what we are doing with our own 26 kilometre licence on the Skardu road.",
      "## What is placer gold?",
      "Placer gold is gold that erosion has already broken out of its host rock and water has carried downstream. Gold is heavy, so it settles wherever the current slows: inside bends, behind boulders, and in the black sand layers on the riverbed. You do not need to drill or crush rock to reach it. You need to move and wash a great deal of sediment and catch the heavy fraction.",
      "## Where is placer gold found in Pakistan?",
      "Mostly in the north. The Gilgit Baltistan mines department says almost every river and stream in the region carries placer gold, with the Indus and Gilgit rivers and their tributaries the best known. Bagrot valley near Gilgit and Shimshal in upper Hunza have both been the subject of published geological research on their placer deposits. Further south, Khyber Pakhtunkhwa has placer occurrences in valleys such as Kund, Alladher and Beka along the Indus suture zone.",
      "## How is placer gold mined in Gilgit Baltistan today?",
      "Mostly by hand. Families work the riverbanks with pans, sluices and simple tools, often in the season when water levels drop. Abdul Bashir, a chief geologist at Koh-e-Daleel Minerals, told The Nation in 2024 that the work still runs on conventional panning and rudimentary tools, with mercury used generously to pull the gold out of the concentrate. That mercury ends up in the rivers, which is a real problem for everyone living downstream.",
      "## Why hasn't placer gold in Pakistan been developed properly?",
      "Three reasons come up again and again. There has never been systematic exploration, so nobody can say with confidence how much gold a given stretch of river holds, and the same 2024 report said the exact potential has never been identified for lack of modern exploration methods. There is very little mechanisation, so recovery rates stay low. And much of the work happens outside formal licensing, which means no one invests in equipment and no one is accountable for the mercury.",
      "## How much gold can a placer operation recover?",
      "Anyone who gives you a confident number without testing that exact stretch of river is guessing. Grade changes from one bend to the next. The honest method is bulk sampling: dig and process a measured volume from several points and see what it actually yields. That is what we do before we talk tonnage with anyone, and it is why we share recovery data after an NDA rather than publishing a headline figure.",
      "## What does a modern placer gold operation look like?",
      "Excavators or small dredges to move sediment, trommels to screen out boulders, and sluices and jigs to concentrate the heavy fraction, with gold then separated by gravity rather than mercury. It remains a fairly low-capital business compared with hard-rock mining, and it reaches production much faster. The main costs are fuel, equipment, and getting both to site, which is why access is the first thing to check on any placer ground.",
      "## Where is Durr & Zircon's placer gold licence?",
      "Our placer gold licence covers 26 kilometres of riverbed in Skardu, with gold carried in black sand, and it runs along the Skardu road. It is one of our four producing blocks and is held by Durr Mines and Minerals. Being on the road means equipment, fuel and material move by truck, which removes the single largest cost in remote Karakoram work. Details are on the [Skardu placer gold concession page](/concessions/skardu-placer-gold), and supply terms are on the [placer gold page](/commodities/placer-gold).",
      "## Is placer gold mining legal in Pakistan?",
      "Yes, under licence. In Gilgit Baltistan mineral titles are granted by the Mines and Minerals Department under the 2016 concession rules, and only to locally incorporated companies. A foreign investor comes in through a joint venture or farm-in with a licence holder. The stages are explained in our [licensing guide](/guides/mining-licence-gilgit-baltistan).",
      "## How do I invest in placer gold in Pakistan?",
      "You can buy gold concentrate or dore from us, quoted FOB Karachi or CIF with assay available, or you can take a joint venture position in the operation itself. Start at the [investor desk](/investor-desk) and tell us which of the two you have in mind.",
    ].join('\n\n'),
    imageUrl: '/images/commodities/placer-gold-new.webp',
    publishDate: '2026-09-09T10:00:00Z',
    companyId: 'durr-zircon',
  },
  {
    id: 'rare-earth-metals-mining-pakistan-gilgit-baltistan',
    title: 'Rare Earth Metals in Pakistan and Gilgit Baltistan: What Is Real and What Is Hype',
    excerpt: 'Where rare earth elements have actually been found in Pakistan, what Gilgit Baltistan does and does not have, and what the 2025 US shipment really tells investors.',
    content: [
      "Rare earths are the most searched mineral topic in Pakistan right now, and the most exaggerated. Trillion dollar figures get repeated without a source in sight. We do not hold a rare earth licence ourselves, which puts us in a reasonable position to give you a straight picture: where they have been found, what is still unproven, and which related minerals in Gilgit Baltistan are genuinely in play.",
      "## What are rare earth metals?",
      "Rare earth elements are a group of 17 metals, including neodymium, praseodymium, lanthanum and cerium. They go into the permanent magnets inside electric vehicle motors and wind turbines, into electronics, and into defence systems. They are not especially rare in the ground. What is rare is finding them concentrated enough to mine, and then separating them, which is chemically difficult and dominated by China.",
      "## Does Pakistan have rare earth deposits?",
      "Pakistan has rare earth occurrences, which is not the same thing as proven deposits. Reporting in The Friday Times in December 2025 listed the main known settings: granitic and pegmatite complexes in Chagai in Balochistan, rare earth bearing granites in Dir, Swat and Kohistan, and coastal placer sands in Sindh and Balochistan. None of these yet has an internationally certified reserve estimate. CSIS made the wider point in April 2026 that more than 95 percent of Pakistan's mineral terrain remains underexplored.",
      "## Has Pakistan actually exported rare earths?",
      "Yes, and it was a meaningful first even if the volume was small. In October 2025 the first shipment under the $500 million partnership between Pakistan and US Strategic Metals included rare earth elements, among them neodymium and praseodymium, alongside antimony and copper concentrate. It was more a statement of intent than a volume play, but it moved Pakistan from talking about rare earths to shipping them. The deal is covered on our [United States market page](/markets/usa).",
      "## Are there rare earth metals in Gilgit Baltistan?",
      "This is where we want to be careful. The best documented rare earth settings in Pakistan are in Balochistan, northern Khyber Pakhtunkhwa and the coast. The north has the kind of geology where rare earths can occur, including granites and pegmatites, and it borders Kohistan, which is on the list. But we have not seen published evidence of a defined rare earth deposit in Gilgit Baltistan, and we would be suspicious of anyone claiming one without an assay to show you. None of our ten blocks is a rare earth licence.",
      "## What critical minerals does Gilgit Baltistan have instead?",
      "Quite a few, and they sit on the same government and buyer lists as rare earths. Antimony is the standout: the mines department lists grades of 50.4 to 81.5 percent at Darkot, Chupurson, Kharmang and Astak, and antimony travelled in the same October 2025 shipment to the US. Copper is on most critical mineral lists now because of electrification. Molybdenum occurs in Hunza, Skardu, Chilas and Astore, and lithium indications turn up in several places, including two of our blocks. If your mandate is critical minerals rather than rare earths specifically, the north is worth a serious look.",
      "## Can foreigners invest in rare earth mining in Pakistan?",
      "Through the same routes as any other mineral: a joint venture or farm-in with a locally incorporated licence holder, or a Pakistani subsidiary of your own. Two practical issues are particular to rare earths. There is no domestic separation capacity, as The Friday Times noted, so anything mined leaves the country as concentrate. And federal and provincial rules are still being harmonised under the 2025 framework, so check which regime applies to the ground you are looking at before you commit.",
      "## How can I tell a real rare earth opportunity from hype?",
      "Ask for the assay, the laboratory that ran it, and exactly which elements were measured. Ask whether a figure is a grade in the rock or a value per tonne. Ask whether anyone has done metallurgical testing, because a rare earth deposit you cannot separate economically is just an interesting rock. And be very wary of any valuation in the trillions. Pakistan's own headline figure for all of its minerals combined is $8 trillion, and CSIS treats even that as aspirational.",
      "## Where should I start if I want critical minerals exposure in Pakistan?",
      "If you want rare earths specifically, the documented ground is in Balochistan and Khyber Pakhtunkhwa, and those are the licence holders to talk to. If critical minerals more broadly is the goal, our [antimony](/commodities/antimony-concentrate) and [copper](/commodities/copper-concentrate) supply and our [concessions](/concessions) in Gilgit Baltistan are a reasonable place to begin. The [investor desk](/investor-desk) is the way in.",
    ].join('\n\n'),
    imageUrl: '/images/mo-1.jpg',
    publishDate: '2026-09-09T12:00:00Z',
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

