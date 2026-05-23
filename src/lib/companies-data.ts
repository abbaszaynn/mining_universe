import type { Company } from '@/lib/types';
import { galleryImages } from '@/lib/gallery-images-data';

export const companies: Company[] = [
  {
    id: 'durr-mines-and-minerals',
    name: 'Durr Mines and Minerals (PVT) LTD',
    tagline: 'Unearthing the Future, Responsibly.',
    logoUrl: '/images/durr-mines-logo.png', // Updated local logo
    description: 'Durr Mines and Minerals is a leading exploration and development company incorporated under the Securities and Exchange Commission of Pakistan. We are focused on critical and precious metals including Copper, Marble, and Gold in the mineral-rich Gilgit-Baltistan region. With a commitment to sustainable practices and community engagement, we are at the forefront of unlocking the mineral wealth of Pakistan.',
    history: 'Durr Mines & Minerals (Private) Limited was incorporated on the 13th of June, 2025, under the Companies Act, 2017 (Corporate Unique ID: 0297552). Since our inception, we have secured multiple mining leases in key strategic locations. Our journey began with a vision to modernize mining in Northern Pakistan, leveraging local expertise and adhering to international safety and environmental standards. We have rapidly expanded our portfolio to include Copper Ore at Skardu, Marble Ore at Bagicha, and Placer Gold deposits.',
    leadership: [
      { name: 'Tabish Hassan', title: 'Chief Executive Officer (CEO)' },
      { name: 'Daniyal Hassan', title: 'Director' },
    ],
    projects: [
      { name: 'Durr Mine & Minerals Copper Mine (Gultari)' },
      { name: 'Bagicha Marble Mine' },
      { name: 'Mahdi Abad Kharmang' },
      { name: 'Placer Gold Skardu' },
    ],
    status: 'Operational',
    investorContacts: [
      { name: 'Zain Abbas', email: 'abbaszayn08@gmail.com', phone: '+92 310 9108714' },
    ],
    locations: [
      {
        name: 'Durr Copper Mine (Gultari)',
        polygon: [
          { lat: 34.746706, lng: 75.630010 },
          { lat: 34.740339, lng: 75.644094 },
          { lat: 34.721708, lng: 75.661562 },
          { lat: 34.701370, lng: 75.671159 },
          { lat: 34.698445, lng: 75.686172 },
          { lat: 34.692636, lng: 75.694130 },
          { lat: 34.683967, lng: 75.685651 },
          { lat: 34.689811, lng: 75.657918 },
          { lat: 34.692394, lng: 75.611105 },
          { lat: 34.704402, lng: 75.607838 },
          { lat: 34.703439, lng: 75.646978 },
          { lat: 34.737789, lng: 75.629405 },
          { lat: 34.744648, lng: 75.624278 },
        ],
      },
      {
        name: 'Bagicha Marble Mine',
        polygon: [
          { lat: 35.606778, lng: 75.374582 },
          { lat: 35.611378, lng: 75.356035 },
          { lat: 35.603268, lng: 75.343413 },
          { lat: 35.558972, lng: 75.346333 },
          { lat: 35.556753, lng: 75.397472 },
          { lat: 35.570902, lng: 75.398565 },
          { lat: 35.575398, lng: 75.383905 },
          { lat: 35.599013, lng: 75.373735 },
        ],
      },
      {
        name: 'Mahdi Abad Kharmang',
        polygon: [
          { lat: 35.132248, lng: 75.93232 },
          { lat: 35.083869, lng: 75.966824 },
          { lat: 35.092, lng: 75.980235 },
          { lat: 35.098453, lng: 75.979636 },
          { lat: 35.135057, lng: 75.950661 },
          { lat: 35.132248, lng: 75.93232 },
        ],
      },
      {
        name: 'Placer Gold Skardu',
        polygon: [
          { lat: 35.680232, lng: 75.260285 },
          { lat: 35.679916, lng: 75.262345 },
          { lat: 35.678936, lng: 75.263429 },
          { lat: 35.67772, lng: 75.264904 },
          { lat: 35.67752, lng: 75.265746 },
          { lat: 35.677711, lng: 75.266245 },
          { lat: 35.676456, lng: 75.267168 },
          { lat: 35.676178, lng: 75.267919 },
          { lat: 35.67538, lng: 75.268847 },
          { lat: 35.675389, lng: 75.269727 },
          { lat: 35.673005, lng: 75.270537 },
          { lat: 35.665258, lng: 75.282011 },
          { lat: 35.664291, lng: 75.283298 },
          { lat: 35.664265, lng: 75.284425 },
          { lat: 35.661806, lng: 75.286206 },
          { lat: 35.660978, lng: 75.287848 },
          { lat: 35.656846, lng: 75.289897 },
          { lat: 35.656454, lng: 75.290809 },
          { lat: 35.654153, lng: 75.292815 },
          { lat: 35.651572, lng: 75.292847 },
          { lat: 35.649183, lng: 75.292772 },
          { lat: 35.648181, lng: 75.293931 },
          { lat: 35.646699, lng: 75.295658 },
          { lat: 35.64744, lng: 75.29657 },
          { lat: 35.645652, lng: 75.298491 },
          { lat: 35.645609, lng: 75.299746 },
          { lat: 35.64342, lng: 75.303608 },
          { lat: 35.639846, lng: 75.308683 },
          { lat: 35.635833, lng: 75.311982 },
          { lat: 35.631268, lng: 75.313028 },
          { lat: 35.628739, lng: 75.314112 },
          { lat: 35.627021, lng: 75.314916 },
          { lat: 35.624873, lng: 75.317953 },
          { lat: 35.623786, lng: 75.318339 },
          { lat: 35.622098, lng: 75.320753 },
          { lat: 35.621505, lng: 75.320705 },
          { lat: 35.619204, lng: 75.31762 },
          { lat: 35.615186, lng: 75.318344 },
          { lat: 35.613882, lng: 75.318135 },
          { lat: 35.612709, lng: 75.318779 },
          { lat: 35.610902, lng: 75.318578 },
          { lat: 35.60927, lng: 75.316247 },
          { lat: 35.60601, lng: 75.315195 },
          { lat: 35.60606, lng: 75.311633 },
          { lat: 35.60055, lng: 75.310056 },
          { lat: 35.600512, lng: 75.311698 },
          { lat: 35.605331, lng: 75.312181 },
          { lat: 35.605662, lng: 75.315936 },
          { lat: 35.60957, lng: 75.317395 },
          { lat: 35.611105, lng: 75.319369 },
          { lat: 35.615759, lng: 75.319047 },
          { lat: 35.619129, lng: 75.318751 },
          { lat: 35.621955, lng: 75.32203 },
          { lat: 35.62792, lng: 75.315142 },
          { lat: 35.636584, lng: 75.31247 },
          { lat: 35.64213, lng: 75.307589 },
          { lat: 35.642181, lng: 75.305765 },
          { lat: 35.645598, lng: 75.300808 },
          { lat: 35.646193, lng: 75.298394 },
          { lat: 35.646672, lng: 75.298222 },
          { lat: 35.64778, lng: 75.296345 },
          { lat: 35.647204, lng: 75.29539 },
          { lat: 35.654303, lng: 75.293148 },
          { lat: 35.658921, lng: 75.289596 },
          { lat: 35.661243, lng: 75.288191 },
          { lat: 35.664852, lng: 75.284328 },
          { lat: 35.675848, lng: 75.269963 },
          { lat: 35.678088, lng: 75.266272 },
          { lat: 35.681081, lng: 75.261412 },
          { lat: 35.681987, lng: 75.258815 },
          { lat: 35.680232, lng: 75.260285 },
        ],
      },
    ],
    images: galleryImages.filter(img => img.companyName === 'Durr Mines and Minerals'),
    videos: [],
    virtualTourUrl: '#',
    documents: [
      { id: 'doc-topography-bagicha', title: 'Topography Map - Bagicha', url: 'https://mega.nz/file/MEJFnChR#1WB-2XkqCyYkhoX55zoMsaiKZr6C5yKkBOiwSr4l27Q', type: 'Map' },
      { id: 'doc-topography-gultari', title: 'Topography Map - Gultari', url: 'https://mega.nz/file/9RQlxCIY#wBlkzySRZj_bx0SgmlkTaAndSYVLqGbus18uiX7XD8o', type: 'Map' }
    ],
    deposits: [
      { name: 'Gemstones & Minerals', location: 'Bagicha, Skardu', type: 'Variety of Minerals', details: ['Rubi Gemstones', 'Snow White Marble', 'Lithium Deposits', 'Quartz', 'Area: 20 Sq/Km – 4,942 Acres'] },
      { name: 'Polymetallic Ores', location: 'Gultari', type: 'Complex Ores', details: ['Molybdenum', 'Antimony', 'Lead', 'Gem Stones', 'Area: 20 Sq/Km – 4,942 Acres'] },
      { name: 'Polymetallic Structure', location: 'Kharmang', type: 'Polymetallic Ore', details: ['Copper', 'Iron', 'Silver', 'Complex Polymetallic Structure', 'Area: 9.90 Sq/Km'] },
      { name: 'Placer Gold', location: 'Skardu', type: 'Placer Gold', details: ['Placer Gold', 'Black Sand', 'Riverbed Length: 26 km'] }
    ]
  },
  {
    id: 'earth-lux-mines',
    name: 'Earth Lux Mines & Minerals (PVT) LTD',
    tagline: 'Sustainable Mining for a Brighter Future',
    logoUrl: '/images/earth-lux-logo.jpg', // Updated local logo
    description: 'Earth Lux Mines & Minerals is dedicated to the ethical and environmentally conscious exploration of Pakistan\'s rich mineral resources. We specialize in identifying and developing high-value deposits while ensuring minimal ecological impact and maximum benefit for local communities.',
    history: 'Earth Lux Mines & Minerals (Private) Limited was incorporated on the 28th of August, 2023, under the Companies Act, 2017 (Corporate Unique ID: 0238137). We are a new-generation mining company with a fresh approach. Our foundational projects in Gilgit-Baltistan were selected for their high copper potential and the opportunity to implement modern, sustainable mining techniques from the ground up.',
    leadership: [
      { name: 'Tabish Hassan', title: 'Chief Executive Officer (CEO)' },
      { name: 'Sabih Uddin', title: 'Director' },
      { name: 'Wajid Khan', title: 'Director' },
      { name: 'Saqlain Alam', title: 'Director' },
    ],
    projects: [
      { name: 'Jutial Nala Mine' },
      { name: 'Opposite Gupis Mine' },
    ],
    status: 'Exploratory Phase',
    investorContacts: [
      { name: 'Zain Abbas', email: 'abbaszayn08@gmail.com', phone: '+92 310 9108714' },
    ],
    locations: [
      {
        name: 'Jutial Nala Mine',
        polygon: [
          { lat: 35.856249, lng: 74.294070 }, // A
          { lat: 35.882175, lng: 74.317519 }, // B
          { lat: 35.868325, lng: 74.358017 }, // C
          { lat: 35.856166, lng: 74.354147 }, // D
          { lat: 35.865098, lng: 74.325441 }, // E
          { lat: 35.849004, lng: 74.316212 }, // F
          { lat: 35.856249, lng: 74.294070 }, // Close loop (A)
        ]
      },
      {
        name: 'Opposite Gupis Mine',
        polygon: [
          { lat: 36.264768, lng: 73.461140 }, // A
          { lat: 36.254223, lng: 73.495540 }, // B
          { lat: 36.244428, lng: 73.466853 }, // C
          { lat: 36.233142, lng: 73.459915 }, // D
          { lat: 36.246712, lng: 73.423405 }, // E
          { lat: 36.264768, lng: 73.461140 }, // Close loop (A)
        ]
      }
    ],
    images: galleryImages.filter(img => img.companyName === 'Earth Lux Mines'),
    videos: [],
    virtualTourUrl: '#',
    documents: [
      { id: 'doc-topography-jutial', title: 'Topography Map - Jutial Nala', url: 'https://mega.nz/file/NV4E3I5Q#u9raTiI-ojj2qn_UcrO64xpQQfZgfqdfHwDfBYrnbkw', type: 'Map' },
      { id: 'doc-report-jutial', title: 'Geological Report - Jutial Nala', url: 'https://mega.nz/file/BJ5UiKRB#KYKyTV9pBWtJw5ilFDGHewz16jPwYTmoEA6_ortHuaA', type: 'Geological Report' },
      { id: 'doc-report-gupis', title: 'Geological Report - Gupis', url: 'https://mega.nz/file/5Ih2ARZQ#JXvUAfDZsxfiWlTOWGHEP64WQWvArnKuwEseFZX6UBU', type: 'Geological Report' }
    ],
    deposits: [
      { name: 'Polymetallic Ores', location: 'Jutial Nala, Gilgit', type: 'Polymetallic Ore', details: ['Silver', 'Minralized Copper Veins', 'Lead Deposits', 'Area: 9.97 Sq/Km – 2,471 Acres'] },
      { name: 'Construction & Precious Stones', location: 'Gupis, Ghizer', type: 'Mixed Deposits', details: ['Granite', 'Premium Marble', 'Copper Indications', 'Area: 10 Sq/Km – 2,471 Acres'] }
    ]
  },
  {
    id: 'zircon-mines',
    name: 'Zircon Mines (PVT) LTD',
    tagline: 'Precision Mining for Rare Earth Elements.',
    logoUrl: '/images/zircon-mines-logo.jpg', // Updated local logo
    description: 'Strategically positioned across Hilal Abad and Shigar, Zircon Mines focuses on the exploration and extraction of copper and high-value polymetallic structures. Our mission is to apply modern extraction technologies and rigorous geological standards to unlock the region\'s mineral potential responsibly.',
    history: 'Zircon Mines was established to capitalize on the rich metallogenic belts of Northern Pakistan. With a leadership team rooted in both geological expertise and strategic management, the company has quickly moved to secure key exploration sites. Our incorporation in early 2026 marks the beginning of a dedicated effort to bring world-class mining standards to our operations in Hilal Abad.',
    leadership: [
      { name: 'Zain Abbas', title: 'CEO & Director' },
      { name: 'Tabish Hassan', title: 'Director' },
    ],
    projects: [
      { name: 'Hilal Abad Copper Project' },
      { name: 'Shigar Copper Project' },
    ],
    status: 'Exploratory Phase',
    investorContacts: [
      { name: 'Zain Abbas', email: 'mineszircon@gmail.com', phone: '+92 310 9108714' },
    ],
    locations: [
      {
        name: 'Hilal Abad Site',
        polygon: [
          { lat: 35.088692, lng: 76.039939 },
          { lat: 35.088201, lng: 76.040512 },
          { lat: 35.089571, lng: 76.0456 },
          { lat: 35.072599, lng: 76.050061 },
          { lat: 35.076076, lng: 76.064473 },
          { lat: 35.072071, lng: 76.083283 },
          { lat: 35.099896, lng: 76.075174 },
          { lat: 35.107625, lng: 76.049661 },
          { lat: 35.091198, lng: 76.039591 },
          { lat: 35.088692, lng: 76.039939 },
        ],
      },
      {
        name: 'Shigar Site',
        polygon: [
          { lat: 35.637525, lng: 75.902132 },
          { lat: 35.648217, lng: 75.903757 },
          { lat: 35.660553, lng: 75.843197 },
          { lat: 35.680868, lng: 75.787099 },
          { lat: 35.682053, lng: 75.798407 },
          { lat: 35.677783, lng: 75.807913 },
          { lat: 35.662842, lng: 75.843395 },
          { lat: 35.660891, lng: 75.848296 },
          { lat: 35.664673, lng: 75.847054 },
          { lat: 35.66469, lng: 75.848609 },
          { lat: 35.659531, lng: 75.851257 },
          { lat: 35.66056, lng: 75.859433 },
          { lat: 35.664176, lng: 75.860937 },
          { lat: 35.660715, lng: 75.870378 },
          { lat: 35.665075, lng: 75.876749 },
          { lat: 35.668177, lng: 75.903434 },
          { lat: 35.638013, lng: 75.905601 },
          { lat: 35.637525, lng: 75.902132 },
        ],
      },
    ],
    images: galleryImages.filter(img => img.companyName === 'Zircon Mines'),
    videos: [],
    virtualTourUrl: '#',
    documents: [
      { id: 'doc-zircon-incorporation', title: 'Incorporation Letter', url: 'https://mega.nz/file/NEZRzaoS#2IhACOBZZ9bDi5ty3sPWzxtyIBLuh650iu3cIfhcS9w', type: 'License' }
    ],
    deposits: [
      { name: 'Hilal Abad Polymetallic Complex', location: 'Hilal Abad', type: 'Polymetallic Structure', details: ['Copper', 'Iron', 'Silver', 'Gold', 'Polymetallic Ore Structure', 'Area: 9.97 Sq/Km'] },
      { name: 'Shigar Copper Deposit', location: 'Shigar', type: 'Copper Ore', details: ['Copper Ore', 'Strong Geological Position', 'High Copper Potential', 'Gold with Copper as a strong indication', 'Area: 8.87 Sq/Km'] }
    ]
  },
];
