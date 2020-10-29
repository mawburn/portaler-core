const zones = [
  'Astolat',
  'Avalanche Incline',
  'Avalanche Ravine',
  'Bank of Caerleon',
  'Battlebrae Flatland',
  'Battlebrae Grassland',
  'Battlebrae Lake',
  'Battlebrae Meadow',
  'Battlebrae Peaks',
  'Battlebrae Plain',
  'Bedrock Passage',
  'Bellever Tor',
  'Birchcopse',
  'Birken Fell',
  'Black Monastery',
  'Blackthorn Quarry',
  'Bleachskull Desert',
  'Bleachskull Steppe',
  'Bonepool Marsh',
  'Bowscale Fell',
  'Braemore Lowland',
  'Braemore Upland',
  'Brambleshore Hinterlands',
  'Brent Knoll',
  'Bryn Gorge',
  'Caerleon',
  'Caerleon Market',
  'Caerleon Market',
  'Caerleon Realmgate',
  'Cairn Camain',
  'Cairn Darg',
  'Cairn Fidair',
  'Cairn Glascore',
  'Cairn Gorm',
  'Camlann',
  'Cedarcopse',
  'Chillhag',
  'Citadel of Ash',
  'Cougar Den',
  'Cracked Earth',
  'Craglight Cavern',
  'Creag Garr',
  'Creag Morr',
  'Croker Hill',
  'Crose Gorge',
  'Crosscut Skip',
  'Curlew Fen',
  'Daemonium Keep',
  'Darkbough Snag',
  'Darkseep Core',
  'Darkstone Drift',
  'Deadpine Forest',
  'Deadvein Gully',
  'Deathcap Channel',
  'Deathcreep Adit',
  'Deathreach Priory',
  'Deathwisp Bog',
  'Deathwisp Sink',
  'Deepwood Copse',
  'Deepwood Dell',
  'Deepwood Gorge',
  'Deepwood Pines',
  'Dewleaf Fen',
  'Driftwood Glen',
  'Driftwood Hollow',
  'Driftwood Vale',
  'Driprock Tunnel',
  'Drownfield Course',
  'Drownfield Fen',
  'Drownfield Mire',
  'Drownfield Quag',
  'Drownfield Rut',
  'Drownfield Sink',
  'Drownfield Slough',
  'Drownfield Wetland',
  'Drybasin Oasis',
  'Drybasin Riverbed',
  'Drytop Pillars',
  'Drytop Riverbed',
  'Dryvein Confluence',
  'Dryvein Cross',
  'Dryvein End',
  'Dryvein Oasis',
  'Dryvein Plain',
  'Dryvein Riverbed',
  'Dryvein Steppe',
  'Drywater Meadow',
  'Dusklight Fen',
  'Eldersleep',
  'Eldon Hill',
  'Everglow Deep',
  'Everwinter Crossing',
  'Everwinter Expanse',
  'Everwinter Gap',
  'Everwinter Gorge',
  'Everwinter Incline',
  'Everwinter Passage',
  'Everwinter Peak',
  'Everwinter Plain',
  'Everwinter Reach',
  'Everwinter Shores',
  'Eye of the Forest',
  'Farshore Bay',
  'Farshore Cape',
  'Farshore Drylands',
  'Farshore Esker',
  'Farshore Heath',
  'Farshore Lagoon',
  'Ferndell',
  'Firesink Caldera',
  'Firesink Trench',
  'Flammog Desolation',
  'Flammog Fork',
  'Flammog Valley',
  'Flatrock Cliffs',
  'Flatrock Plateau',
  'Floatshoal Bight',
  'Floatshoal Fissure',
  'Floatshoal Floe',
  'Forest Burrow',
  'Fractured Ground',
  'Frostbite Chasm',
  'Frostbite Mountain',
  'Frostpeak Ascent',
  'Frostpeak Vista',
  'Frostseep Crevasse',
  'Frostseep Ravine',
  'Frostspring Passage',
  'Frostspring Vulcano',
  'Giantweald Copse',
  'Giantweald Dale',
  'Giantweald Edge',
  'Giantweald Glade',
  'Giantweald Roots',
  'Giantweald Woods',
  'Glacierbreak Summit',
  'Glacierfall Canyon',
  'Glacierfall Cross',
  'Glacierfall Fissure',
  'Glacierfall Pass',
  'Glacierfall Passage',
  'Glacierfall Valley',
  'Gleamstone Deep',
  'Glowmire Grotto',
  'Goffers Knoll',
  'Gravemound Brim',
  'Gravemound Cliffs',
  'Gravemound Hills',
  'Gravemound Knoll',
  'Gravemound Slope',
  'Greenhollow Copse',
  'Greenhollow Vale',
  'Greenshore Bay',
  'Greenshore Peninsula',
  'Gutras Hill',
  'Gwan Gorge',
  'Haldon Tor',
  'Haytor',
  'Highbole Glen',
  'Highstone Grassland',
  'Highstone Loch',
  'Highstone Meadow',
  'Highstone Mound',
  'Highstone Plains',
  'Highstone Plateau',
  'Hightree Borderlands',
  'Hightree Cliffs',
  'Hightree Dale',
  'Hightree Enclave',
  'Hightree Glade',
  'Hightree Hillock',
  'Hightree Isle',
  'Hightree Lake',
  'Hightree Levee',
  'Hightree Pass',
  'Hightree Portal East',
  'Hightree Portal North',
  'Hightree Portal West',
  'Hightree Steep',
  'Hightree Strand',
  'Hornbeam Wood',
  'Iceburn Cliffs',
  'Iceburn Firth',
  'Iceburn Peaks',
  'Iceburn Tundra',
  'Inis Mon',
  'Kindlegrass Steppe',
  'Larchroad',
  'Lazygrass Plain',
  'Lewsdon Hill',
  'Longfen Arms',
  'Longfen Marsh',
  'Longfen Veins',
  'Longmarch Meadow',
  'Longtimber Glen',
  "Lurkers' Hollow",
  'Malag Crevasse',
  'Mardale',
  'Mase Knoll',
  'Mawar Gorge',
  'Meltwater Bog',
  'Meltwater Channel',
  'Meltwater Delta',
  'Meltwater Sump',
  'Middlemurk Path',
  'Mudfoot Mounds',
  'Mudfoot Sump',
  'Mudrock Burrow',
  'Munten Fell',
  'Munten Rise',
  'Munten Tundra',
  'Murdergulch Cross',
  'Murdergulch Divide',
  'Murdergulch Gap',
  'Murdergulch Ravine',
  'Murdergulch Trail',
  'Murkweald',
  'Nightbloom Track',
  'Nightcreak Marsh',
  'Northstrand Beach',
  'Northstrand Dunes',
  'Oakcopse',
  'Ore Adit',
  'Parchsand Cliffs',
  'Parchsand Drought',
  'Parchthroat Plain',
  'Pen Garn',
  'Pen Gent',
  'Pen Kerrig',
  'Pen Uchaf',
  "Prospector's Hope",
  'Razorrock Bank',
  'Razorrock Chasm',
  'Razorrock Edge',
  'Razorrock Gulch',
  'Razorrock Passage',
  'Razorrock Ravine',
  'Razorrock Valley',
  'Razorrock Verge',
  'Redlake',
  'Redtree Enclave',
  'Rivercopse Crossing',
  'Rivercopse Curve',
  'Rivercopse Fount',
  'Rivercopse Path',
  'Roastcorpse Steppe',
  'Rock Adit',
  'Rock Adit',
  'Rowanwood',
  'Runnel Sink',
  'Runnelvein Bog',
  'Runnelvein Sink',
  'Runnelvein Slough',
  'Russerdell',
  'Sabertooth Den',
  'Saddle Tor',
  'Sandmount Ascent',
  'Sandmount Desert',
  'Sandmount Esker',
  'Sandmount Strand',
  'Sandrift Coast',
  'Sandrift Dunes',
  'Sandrift Expanse',
  'Sandrift Fringe',
  'Sandrift Portal East',
  'Sandrift Portal North',
  'Sandrift Portal West',
  'Sandrift Prairie',
  'Sandrift Shore',
  'Sandrift Steppe',
  'Scuttlesink Marsh',
  'Scuttlesink Mouth',
  'Scuttlesink Pools',
  'Shale Underway',
  'Shaleheath Hills',
  'Shaleheath Steep',
  'Shiftshadow Expanse',
  'Skullmarsh Lower',
  'Skullmarsh Upper',
  'Skylake Bridge',
  'Skylake Hinterlands',
  'Skysand Plateau',
  'Skysand Ridge',
  'Slakesands Canyon',
  'Slakesands Mesa',
  'Sleetwater Basin',
  'Slimehag',
  'Slowtree Plain',
  'Smoothfloor Cleft',
  "Smuggler's Rut",
  'Snapshaft Trough',
  'Southgrove Copse',
  'Southgrove Escarp',
  'Southgrove Thicket',
  'Spectral Sump',
  'Springsump Basin',
  'Springsump Melt',
  'Springsump Wetland',
  'Stagbourne',
  'Stalagmite Adit',
  'Steelhide Meadow',
  'Stinkhag',
  'Stonelake Fields',
  'Stonelake Hillock',
  'Stonemouth Bay',
  'Stonemouth Northbluff',
  'Stonemouth Southbluff',
  'Stoneslip Passage',
  'Stumprot Swamp',
  'Sunfang Approach',
  'Sunfang Cliffs',
  'Sunfang Dawn',
  'Sunfang Ravine',
  'Sunfang Wasteland',
  'Sunkenbough Spring',
  'Sunkenbough Woods',
  'Sunstrand Delta',
  'Sunstrand Dunes',
  'Sunstrand Quicksands',
  'Sunstrand Shoal',
  'Swamp Burrow',
  'Swiftsands Basin',
  'Swiftsands Chaparral',
  'Swiftsands Plain',
  'Tharcal Fissure',
  'The Underway',
  'Thirstwater Gully',
  'Thirstwater Steppe',
  'Thirstwater Waste',
  'Thunderrock Ascent',
  'Thunderrock Draw',
  'Thunderrock Rapids',
  'Thunderrock Upland',
  'Timberscar Copse',
  'Timberscar Dell',
  'Timberslope Bridge',
  'Timberslope Dell',
  'Timberslope Grove',
  'Timbertop Dale',
  'Timbertop Escarp',
  'Timbertop Wood',
  'Twinchannel Narrows',
  'Unhallowed Cloister',
  'Vixen Tor',
  'Wailing Bulwark',
  'Watchwood Bluffs',
  'Watchwood Grove',
  'Watchwood Lakeside',
  'Watchwood Precipice',
  'Westweald Shore',
  'Westweald Thicket',
  'Wetgrave Bog',
  'Wetgrave Marsh',
  'Wetgrave Swale',
  'Whitebank Cross',
  'Whitebank Descent',
  'Whitebank Portal East',
  'Whitebank Portal North',
  'Whitebank Portal South',
  'Whitebank Ridge',
  'Whitebank Shore',
  'Whitebank Stream',
  'Whitebank Wall',
  'Whitecap Cave',
  'Whitecliff Expanse',
  'Whitecliff Peak',
  'Whitepeak Ascent',
  'Whitepeak Spring',
  'Whitepeak Tundra',
  'Whitewall Pass',
  'Whitewall Ridge',
  'Widemoor Delta',
  'Widemoor End',
  'Widemoor Estuary',
  'Widemoor Fen',
  'Widemoor Flats',
  'Widemoor Hills',
  'Widemoor Pool',
  'Widemoor Portal North',
  'Widemoor Portal South',
  'Widemoor Portal West',
  'Widemoor Shore',
  'Widemoor Woods',
  'Willow Wood',
  'Willowshade Hills',
  'Willowshade Icemarsh',
  'Willowshade Lake',
  'Willowshade Mire',
  'Willowshade Pools',
  'Willowshade Sink',
  'Willowshade Wetlands',
  'Willowsigh Marsh',
  'Windgrass Border',
  'Windgrass Coast',
  'Windgrass Fields',
  'Windgrass Gully',
  'Windgrass Portal North',
  'Windgrass Portal South',
  'Windgrass Portal West',
  'Windgrass Precipice',
  'Windgrass Rill',
  'Windgrass Terrace',
  'Windripple Fen',
  'Wispwhisper Marsh',
  'Wyre Forest',
  'Yew Wood',
  'Cases-Ugumlos',
  'Casitos-Alieam',
  'Casitos-Atinaum',
  'Casitos-Avaelum',
  'Casos-Aiagsum',
  'Casos-Aximam',
  'Casos-Ayosrom',
  'Casos-Uruxtum',
  'Cebitos-Aeaylum',
  'Cebos-Avemlum',
  'Ceres-Iooinum',
  'Ceritos-Avulsum',
  'Ceros-Aeaylum',
  'Cetitos-Aiayrom',
  'Cetitos-Avixnum',
  'Cetitos-Aximam',
  'Cetos-Obaelos',
  'Cieites-Ugumlos',
  'Cieitos-Avioaum',
  'Cieitos-Ayosrom',
  'Cieitos-Obaelos',
  'Cieitos-Otatrom',
  'Cieos-Atatlum',
  'Cilitos-Opodam',
  'Cilos-Avioaum',
  'Cilos-Ofailos',
  'Cilos-Otatrom',
  'Conitos-Ofailos',
  'Conitos-Oxaeaum',
  'Conitos-Uruxtum',
  'Conos-Avaelum',
  'Coritos-Avemlum',
  'Coros-Aiayrom',
  'Coros-Alieam',
  'Coros-Atinaum',
  'Coues-Exakrom',
  'Couos-Ayayaum',
  'Couos-Opodam',
  'Curites-Exakrom',
  'Curitos-Ayayaum',
  'Curos-Avulsum',
  'Cuyites-Iooinum',
  'Cynitos-Aiagsum',
  'Cynitos-Atatlum',
  'Cynos-Avixnum',
  'Cynos-Oxaeaum',
  'Fasites-Azazsum',
  'Fasitos-Atezsum',
  'Fasitos-Oleraum',
  'Fasitos-Oyuctum',
  'Fasos-Ayiotum',
  'Febites-Opavun',
  'Febos-Acalun',
  'Ferites-Ohohtum',
  'Feritos-Enomaum',
  'Feritos-Osinsum',
  'Feros-Oyuctum',
  'Fetos-Aiaylos',
  'Fiees-Ohohtum',
  'Fieites-Unavtum',
  'Fieos-Aiuttum',
  'Fieos-Atezsum',
  'Files-Azazsum',
  'Filites-Izohun',
  'Filitos-Uzazlum',
  'Filos-Abalam',
  'Firitos-Alodrom',
  'Firos-Aiavam',
  'Firos-Enomaum',
  'Firos-Ezatam',
  'Firos-Osinsum',
  'Fones-Opavun',
  'Fonitos-Amaurom',
  'Fonos-Aiugsum',
  'Fonos-Oleraum',
  'Foritos-Aiaylos',
  'Foros-Egoisum',
  'Foros-Uzazlum',
  'Foues-Aeaosum',
  'Fouitos-Aiuttum',
  'Fouos-Agosaum',
  'Fouos-Amaurom',
  'Furitos-Aiavam',
  'Fuyes-Izohun',
  'Fuyitos-Acalun',
  'Fuyitos-Ayiotum',
  'Fynes-Unavtum',
  'Fynites-Aeaosum',
  'Fynitos-Abalam',
  'Fynitos-Agosaum',
  'Fynitos-Aiugsum',
  'Fynitos-Egoisum',
  'Fynitos-Ezatam',
  'Fynos-Alodrom',
  'Hasitos-Avaolum',
  'Hasitos-Umayaum',
  'Hasos-Agoitum',
  'Hasos-Ayousum',
  'Hasos-Inayaum',
  'Hasos-Iuimaum',
  'Hasos-Osuorom',
  'Hebes-Ouaylos',
  'Hebites-Exemrom',
  'Hebitos-Atontum',
  'Hebos-Ulamsum',
  'Heritos-Exozlos',
  'Heritos-Eyoztum',
  'Heritos-Inayaum',
  'Heros-Atoyam',
  'Hetitos-Iuaerom',
  'Hieos-Aiigaum',
  'Hieos-Avaolum',
  'Hiles-Izizaum',
  'Hilites-Ugumtum',
  'Hilitos-Aiigaum',
  'Hilitos-Osuorom',
  'Hiros-Exozlos',
  'Hiros-Iuaerom',
  'Honites-Izizaum',
  'Honitos-Uxeulum',
  'Honos-Oyezam',
  'Honos-Umayaum',
  'Horos-Ohenlum',
  'Hures-Ugumtum',
  'Hurites-Ieatun',
  'Hurites-Ouaylos',
  'Huritos-Iuimaum',
  'Huritos-Oiaelos',
  'Huros-Atontum',
  'Huyes-Ogozlum',
  'Huyitos-Agoitum',
  'Huyitos-Ohenlum',
  'Huyos-Eyoztum',
  'Huyos-Uxeulum',
  'Hynes-Exemrom',
  'Hynes-Ieatun',
  'Hynites-Ogozlum',
  'Hynitos-Atoyam',
  'Hynitos-Ayousum',
  'Hynitos-Oyezam',
  'Hynitos-Ulamsum',
  'Hynos-Oiaelos',
  'Oasitos-Aoeuam',
  'Oasos-Eraerom',
  'Oasos-Uromlum',
  'Oebitos-Eraerom',
  'Oebitos-Oyozam',
  'Oebos-Ixakaum',
  'Oeritos-Ecunsum',
  'Oeritos-Oyexlos',
  'Oetos-Ofailos',
  'Oetos-Oyexlos',
  'Oieitos-Ixakaum',
  'Oieos-Umiutum',
  'Oires-Oloblum',
  'Oiritos-Eramtum',
  'Oiros-Alaiam',
  'Oonitos-Umiutum',
  'Ooros-Ataltum',
  'Ooros-Ecunsum',
  'Oouitos-Alaiam',
  'Oures-Araosum',
  'Ouritos-Ataltum',
  'Ouritos-Ofailos',
  'Ouyos-Aoeuam',
  'Oynites-Araosum',
  'Oynites-Oloblum',
  'Oynitos-Uromlum',
  'Oynos-Eramtum',
  'Oynos-Oyozam',
  'Pasos-Avosam',
  'Pebos-Avosrom',
  'Peritos-Avosam',
  'Peritos-Oconun',
  'Peros-Aiataum',
  'Petitos-Amayam',
  'Petitos-Avosrom',
  'Petos-Aietam',
  'Pieos-Eterrom',
  'Pieos-Ofairom',
  'Pilitos-Eterrom',
  'Pirites-Unatam',
  'Piritos-Ofavam',
  'Piritos-Opabrom',
  'Ponitos-Aiayrom',
  'Poros-Aiayrom',
  'Poros-Oconun',
  'Poues-Unatam',
  'Pouitos-Ofairom',
  'Pures-Ouozlum',
  'Puros-Amayam',
  'Puros-Ofavam',
  'Puyitos-Aiataum',
  'Pynites-Ouozlum',
  'Pynitos-Aietam',
  'Pynos-Opabrom',
  'Qiient-Al-Nusom',
  'Qiient-Al-Odesum',
  'Qiient-Al-Qinsis',
  'Qiient-Al-Tersas',
  'Qiient-Al-Viesis',
  'Qiient-Al-Vynsis',
  'Qiient-Et-Nusas',
  'Qiient-Et-Odetis',
  'Qiient-Et-Qinsum',
  'Qiient-Et-Tertum',
  'Qiient-In-Nutis',
  'Qiient-In-Odetum',
  'Qiient-In-Qinsis',
  'Qiient-In-Tersom',
  'Qiient-In-Viesis',
  'Qiient-In-Vyntum',
  'Qiient-Nutis',
  'Qiient-Oc-Odetum',
  'Qiient-Odesas',
  'Qiient-Qi-Nusom',
  'Qiient-Qi-Odesas',
  'Qiient-Qi-Tersas',
  'Qiient-Qi-Vynsis',
  'Qiient-Qinsum',
  'Qiient-Sa-Odetis',
  'Qiient-Si-Nusas',
  'Qiient-Si-Odesum',
  'Qiient-Si-Tertum',
  'Qiient-Tersom',
  'Qiient-Vyntum',
  'Qiitun-Al-Duosum',
  'Qiitun-Duosum',
  'Qiitun-Et-Vietis',
  'Qiitun-Et-Vynsom',
  'Qiitun-Si-Vynsom',
  'Qiitun-Vietis',
  'Quaent-Al-Nusis',
  'Quaent-Al-Odesum',
  'Quaent-Al-Qintis',
  'Quaent-Al-Tersis',
  'Quaent-Al-Viesom',
  'Quaent-Al-Vynsum',
  'Quaent-In-Nusis',
  'Quaent-In-Odesum',
  'Quaent-Qintis',
  'Quaent-Tersis',
  'Quaent-Viesom',
  'Quaent-Vynsum',
  'Quatun-Et-Nusas',
  'Quatun-Et-Odetum',
  'Quatun-Nusas',
  'Quatun-Odetum',
  'Sases-Aoarsum',
  'Sases-Avuotum',
  'Sasitos-Oyarlum',
  'Sasitos-Ugersum',
  'Sasitos-Umogaum',
  'Sasos-Abizaum',
  'Sasos-Egeylos',
  'Sasos-Oiozlum',
  'Sebos-Avoirom',
  'Sebos-Oyohun',
  'Sebos-Ugersum',
  'Secent-Al-Duosom',
  'Secent-Al-Nutum',
  'Secent-Al-Odetis',
  'Secent-Al-Qinsom',
  'Secent-Al-Tersum',
  'Secent-Al-Viesum',
  'Secent-Duosom',
  'Secent-Et-Odesis',
  'Secent-Et-Qinsas',
  'Secent-Et-Vyntum',
  'Secent-In-Tersum',
  'Secent-Nutum',
  'Secent-Odesom',
  'Secent-Qi-Odesom',
  'Secent-Qi-Qinsom',
  'Secent-Sa-Odesis',
  'Secent-Si-Odetis',
  'Secent-Si-Qinsas',
  'Secent-Viesum',
  'Secent-Vyntum',
  'Sectun-Al-Vyntis',
  'Sectun-Et-Tersas',
  'Sectun-In-Odesis',
  'Sectun-In-Qinsom',
  'Sectun-In-Vyntis',
  'Sectun-Oc-Odesis',
  'Sectun-Qinsom',
  'Sectun-Tersas',
  'Seritos-Egeylos',
  'Seritos-Onaytum',
  'Setent-Al-Duosas',
  'Setent-Al-Qinsum',
  'Setent-Al-Vietis',
  'Setent-Duosas',
  'Setent-Et-Nusum',
  'Setent-Et-Qintis',
  'Setent-In-Qinsum',
  'Setent-Nusum',
  'Setent-Qintis',
  'Setent-Vietis',
  'Setitos-Obobrom',
  'Setos-Aiaitum',
  'Setos-Avamsum',
  'Settun-Al-Nusis',
  'Settun-Al-Odetum',
  'Settun-Al-Tersom',
  'Settun-Al-Vynsis',
  'Settun-Et-Odetum',
  'Settun-In-Nusis',
  'Settun-In-Odetum',
  'Settun-Odetum',
  'Settun-Tersom',
  'Settun-Vynsis',
  'Sieos-Ofugtum',
  'Silitos-Abizaum',
  'Silos-Apenlum',
  'Silos-Oyarlum',
  'Siritos-Avoirom',
  'Siritos-Oyohun',
  'Siros-Obobrom',
  'Siros-Ofurlos',
  'Sonitos-Ayailos',
  'Soritos-Aiaitum',
  'Soritos-Apenlum',
  'Soritos-Avamsum',
  'Soros-Axaesum',
  'Soues-Uzurtum',
  'Souitos-Oiozlum',
  'Souos-Availos',
  'Souos-Ososlos',
  'Souos-Umogaum',
  'Suyites-Avuotum',
  'Suyites-Uzurtum',
  'Suyitos-Axaesum',
  'Suyitos-Ofugtum',
  'Suyitos-Oyarlos',
  'Suyos-Onaytum',
  'Synites-Aoarsum',
  'Synitos-Availos',
  'Synitos-Ofurlos',
  'Synitos-Ososlos',
  'Synos-Ayailos',
  'Synos-Oyarlos',
  'Tasitos-Obayam',
  'Tasitos-Ulaurom',
  'Tasos-Iriglos',
  'Tebitos-Igaelum',
  'Tebitos-Odoxlum',
  'Teros-Auiusum',
  'Tetitos-Ayoslum',
  'Tetos-Igaelum',
  'Tetos-Ulaurom',
  'Tieitos-Eyexrom',
  'Tieitos-Ouultum',
  'Tieos-Ayoslum',
  'Tilitos-Ataglos',
  'Tiros-Odoxlum',
  'Tiros-Ouultum',
  'Tonitos-Igurlum',
  'Tonitos-Uxavrom',
  'Tonos-Aboysum',
  'Tonos-Obayam',
  'Toritos-Iriglos',
  'Touos-Ataglos',
  'Touos-Uoemtum',
  'Turitos-Atatlos',
  'Turitos-Uoemtum',
  'Tuyitos-Aboysum',
  'Tuyitos-Auiusum',
  'Tynos-Atatlos',
  'Tynos-Eyexrom',
  'Tynos-Igurlum',
  'Tynos-Uxavrom',
  'Xases-Ataglos',
  'Xases-Oxoulum',
  'Xasos-Aeoilos',
  'Xasos-Aoemaum',
  'Xasos-Oneulum',
  'Xebitos-Oyogam',
  'Xebos-Emimsum',
  'Xebos-Exostum',
  'Xerites-Oxoulum',
  'Xetitos-Emimsum',
  'Xetitos-Oneulum',
  'Xetos-Obursum',
  'Xiles-Aiavlum',
  'Xilitos-Aoemaum',
  'Xilos-Osayam',
  'Xiros-Aiairom',
  'Xonites-Aiavlum',
  'Xoritos-Aiairom',
  'Xoritos-Exostum',
  'Xoritos-Osayam',
  'Xouitos-Aeoilos',
  'Xouitos-Eyoztum',
  'Xouos-Aioblos',
  'Xurites-Ataglos',
  'Xuros-Eyoztum',
  'Xuyitos-Aioblos',
  'Xynitos-Obursum',
  'Xynos-Oyogam',
]

module.exports = zones
