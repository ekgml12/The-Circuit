const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const assets=n=>`assets/${n}.webp`;

const timelines=[
  {id:'gen1',label:'1ST GENERATION',era:'1세대',title:'서킷 창설기',desc:'최초의 양대 메이저 리그 ZCL과 CRX가 등장했다. 이후 ZCL의 공작으로 CRX가 붕괴하며 ZCL 단독 체제가 성립했다.',chips:['OBSERVER','ZCL','CRX','CRX COLLAPSE']},
  {id:'gen2',label:'2ND GENERATION',era:'2세대',title:'인디 서킷의 급부상',desc:'에이사, 도미닉, 조, 폴른엔젤, 제리의 “인디 5인방”이 활약한 시기. Kokuzan → JTKF → PFC → 8th Division → Sangre Nova 순으로 창설됐고 PFC가 ZCL의 대안 세력으로 부상했다.',chips:['INDIE 5','KOKUZAN','JTKF','PFC','8TH DIVISION','SANGRE NOVA']},
  {id:'gen3',label:'3RD GENERATION',era:'3세대',title:'JTKF 도약 · PFC 침체',desc:'인디 리그 판도가 재편된 시기. 주요 구도는 JTKF > PFC > 8th Division.',chips:['JTKF RISE','PFC DECLINE','8TH DIVISION']},
  {id:'gen4',label:'4TH GENERATION',era:'CURRENT / 4세대',title:'ASD의 등장',desc:'ASD가 새롭게 부상하고 4세대 인디 신인들이 등장했다. 현재 인디리그 종합 위상은 ASD > JTKF > PFC > 8th Division. 그 위에서 ZCL은 여전히 서킷의 정점에 있다.',chips:['ASD','INDIE 4TH GEN','ZCL APEX','CURRENT']}
];

const leagues=[
  {id:'observer',name:'Observer',long:'OBSERVER',region:'SUPRANATIONAL',status:'ACTIVE / TOP SECRET',class:'observer',summary:'유닛 등록, 연구, 감시, 통제, 존재 은폐 및 서킷 운영을 담당하는 초국가적 극비 조직.',leader:'총장 · 데이브',details:['감응 능력 유닛으로 구성된 스카우트 팀이 미등록 유닛을 발굴','연구 목적: 능력 종류, 응용법, 한계, 근원과 이유','궁극적 목표: 유닛의 능력을 평범한 인간에게 부여하는 것','파이트 인덱스와 도미니언은 명목상 연구 실험이지만 세월이 흐르며 연구진의 유희용 콜로세움 성격도 띠게 됨']},
  {id:'zcl',name:'ZCL',long:'ZCL',region:'USA',status:'ACTIVE / APEX',class:'apex',summary:'1세대부터 이어진 최대 규모의 리그. 과거 CRX를 붕괴시켜 독주 체제를 확립했고 현재도 서킷의 정점에 있다.',leader:'회장 · 헌터(무효화) / 비서 · 아일라 콜드웰 / 간부 · 조이 콜드웰(망각)',details:['자본과 체계적인 조직 구조','내부 규율이 엄격하며 타 리그 언급 금지 조항 존재','ZCL 아래의 모든 조직을 인디 서킷으로 취급','핵심 유닛: 앤더슨(괴력), 로안(쉴드), 플레아(빛), 산사(물)']},
  {id:'crx',name:'CRX',long:'CRX',region:'USA',status:'DEFUNCT',class:'defunct',summary:'ZCL과 함께 1세대 양대 메이저 리그를 형성했으나 ZCL의 공작으로 붕괴했다.',leader:'구 핵심 · 크로우 / 서덜랜드',details:['크로우: 안티 ZCL의 대명사, 공식상 행방불명','서덜랜드: CRX 출신 1세대 원로, 현재 SILENCE 리더']},
  {id:'asd',name:'ASD',long:'ASD',region:'USA',status:'ACTIVE / RISING',summary:'더스틴 아이블이 독립해 창설한 미국 리그. 4세대 인디서킷을 이끌며 빠르게 상승 중이다.',leader:'창설자 · 더스틴 아이블',details:['핵심 유닛: 더스틴 아이블, 데이빗 퀸(Demon), 베가스 형제','현재 인디리그 종합 위상 1위','ASD와 Wildcards는 별개 조직이지만 일부 인력이 비밀리에 중복되어 있다']},
  {id:'jtkf',name:'JTKF',long:'JTKF',region:'JAPAN',status:'ACTIVE',summary:'명예와 무사도를 중심으로 운영되는 일본 리그. 외국인 유닛도 활동하지만 내부 순혈주의가 강하다.',leader:'핵심 · 이츠키 / 케니',details:['현재 인디리그 상위권','이츠키: 회복력 / 케니의 절친']},
  {id:'pfc',name:'PFC',long:'PFC',region:'USA',status:'ACTIVE / DECLINING',summary:'반ZCL 노선의 미국 리그. 2세대에 유력한 대안 세력으로 성장했으나 현재는 침체기다.',leader:'회장 · 카터',details:['카터: 중년 여성, 주인공병 성향','에이사와 봉급 협상 문제로 앙숙','현 주요 전력: Madcaps','구 핵심: 에이사, Holler, 도미닉','극비 정보전 스쿼드 SILENCE 운용']},
  {id:'8th',name:'8th Division',long:'8TH DIVISION',region:'USA',status:'ACTIVE',summary:'실험체와 특수부대 출신 유닛 중심의 미국 리그.',leader:'핵심 · 조 / 폴른엔젤 / 제리',details:['구 핵심: 도미닉, 에이사','2세대 인디 판도의 주요 세력']},
  {id:'sangre',name:'Sangre Nova',long:'SANGRE NOVA',region:'MEXICO',status:'ACTIVE',summary:'격렬하고 의식화된 전투, 그리고 전투의 미학을 중시하는 멕시코 리그.',leader:'핵심 스쿼드 · LAX',details:['LAX: 갱 출신 4인 스쿼드','오로스 · 코파스 · 에스파다스 · 바스토스','도미닉의 과거 소속 리그']},
  {id:'kokuzan',name:'Kokuzan',long:'KOKUZAN',region:'JAPAN',status:'ACTIVE / DECLINING',summary:'기술과 실험을 중심으로 운영되는 일본 리그. 역사는 깊지만 현재는 침체기다.',leader:'핵심 · 오카토',details:['2세대 인디리그 중 가장 먼저 창설된 조직']},
  {id:'indie',name:'Indie Circuit',long:'INDIE CIRCUIT',region:'GLOBAL',status:'DECENTRALIZED',summary:'2세대부터 본격화된 ZCL 외 독립 리그의 통칭. 규모는 다양하며 소규모 리그는 FA 중심으로 운영되기도 한다.',leader:'중앙 조직 없음',details:['유닛 개인 능력과 리그 규모는 비례하지 않음','신인 육성과 상위 리그 진출의 기반 역할']}
];

const characters=[
  {id:'asa',name:'ASA CALDWELL',ko:'에이사 콜드웰',age:34,type:'UNIT',origin:'Atlanta, USA',aff:['ZCL','WILDCARDS'],cover:'정원관리사',ability:'강화신체 · 재생',img:'asa',quote:'2ND GENERATION / FORMER MR. PFC',desc:'2세대 현역 메인이벤터. 과거 PFC의 상징이었고 현재는 ZCL 정식 로스터이자 Wildcards의 리더다.',traits:['냉소','능글','여유','음담패설','트래시 토크','크리스천','고전 게임 덕후','스트레이트에지'],career:['CRX 수련생','FA','PFC (18~32)','Wildcards 창설','Gracie 선제 확보','FA','JTKF','ZCL'],relations:[['케니','10년 전 단발 경기에서 가능성을 알아보고 업계에 남게 한 친밀한 후배. 케니는 친형처럼 존경'],['도미닉','2세대 시절 경쟁자로 시작해 서로를 인정한 오래된 친구. 조사·침투가 필요할 때 비공식 의뢰'],['그레이시','자신이 선제 확보한 피보호자. 현재 동거하며 갈등이 잦음'],['아일라','친척이자 비공식 조력자. 서로 냉담하지만 필요 시 협력'],['더스틴','Wildcards 정식 멤버는 아니며 ZCL 붕괴라는 공통 목표에서만 협력'],['스카이','오랜 동료이자 업계 내 유일한 여사친'],['레일라','비혼주의의 계기가 된 실패한 첫사랑. 서킷 비밀 유지에 대한 죄책감으로 회피 이별'],['올리비아','곤란한 어린 해커. 지속적으로 거절하지만 능력이 유용해 불가피할 때 도움을 청함']],secret:'그레이시의 친부 크로우와 비밀리에 연락 중이며 이를 그레이시에게 숨기고 있다.'},
  {id:'kenny',name:'KENNETH MACDONALD',ko:'케네스 “케니” 맥도날드',age:28,type:'UNIT',origin:'Montreal, Canada',aff:['JTKF','WILDCARDS'],cover:'특수청소부 / 아마추어 MMA',ability:'기억 기반 변신',img:'kenny',quote:'INFILTRATION / CLEANUP',desc:'기억을 기반으로 타인의 외형·목소리·행동 패턴을 모방하는 변신 능력자. 위장·침투·증거 인멸과 현장 정리에 특화됐다.',traits:['유쾌','사교적','장난기','4차원','컬트문화·게임·애니 덕후','도덕적 경계 흐림','양성애자','일본어 유창'],career:['북미 인디','Kokuzan','Wildcards','JTKF'],relations:[['에이사','커리어 초창기 가능성을 알아봐 준 존경하는 형. Wildcards 창설 동료'],['그레이시','Wildcards 내에서 유일하게 심리적 친밀감을 형성한 친구. 에이사와의 갈등을 중재'],['이사도라 “이지” 진','일반인 대학 동기. 케니에게 무자각 호감이 있으며 자신이 그를 챙겨야 한다고 생각']],secret:'Wildcards 핵심 간부.'},
  {id:'gracie',name:'GRACIE VON ERICH',ko:'그레이시 본 에릭',age:19,type:'UNREGISTERED UNIT',origin:'New York, USA',aff:['NO AFFILIATION','WILDCARDS PROTECTED'],cover:'없음',ability:'공식 미측정 · 본격 각성 전',img:'gracie',quote:'OBSERVER / ZCL INTEREST',desc:'CRX 거물 크로우의 딸. 16세 폐창고 분신자살 사건에서 홀로 생존했으며 능력 발현 정황은 있으나 정확한 성질은 아직 불명이다.',traits:['냉소적','비사교적','무심','염세적','까칠함','흡연','마약','경범죄 전과 14범','II 극히 높음'],career:['레비 벨라스코 보호 아래 성장','10세 이후 거리 생활','16세 폐창고 사건','에이사의 선제 확보','Wildcards 보호'],relations:[['크로우','친부. 레비 사망 뒤 직접 접촉을 완전히 끊었고 공식상 행방불명'],['레비 벨라스코','10살까지 자신을 키운 사실상의 마지막 정상적 가정. 레비의 암살이 삶이 무너지는 직접적 분기점'],['에이사','자신을 납치한 보호자. 현재 갈등 많은 동거 관계'],['케니','Wildcards에서 유일하게 믿는 친구'],['이반','무자각 첫사랑. 자신의 과거와 무관하게 자신을 보는 존재라 정서적으로 의존'],['도미닉','에이사의 무서운 친구. 과거 자신을 조사·감시했다는 사실을 알고 있음'],['알렉스 · 조슈아','과거 유치장에서 도발과 말싸움을 주고받으며 이상하게 친해진 사이'],['아일라','과거 자신을 암살하려 했던 인물. 현재는 협력자임을 인지'],['스카이','에이사의 친구이자 레비의 조카임을 알고 있음']],secret:'에이사가 크로우와 현재 비밀리에 연락하고 있다는 사실은 모른다.'},
  {id:'ivan',name:'IVAN VOLKOV',ko:'이반 볼코프',age:23,type:'NON-UNIT',origin:'Dagestan, Russia',aff:['CIVILIAN'],cover:'MMA 선수',ability:'없음',img:'ivan',quote:'CIVILIAN / UNAWARE',desc:'미국 원정 훈련 중인 다게스탄 출신 MMA 선수. 무슬림이며 차분하고 직진형. 서킷과 유닛의 존재를 전혀 모른다.',traits:['차분','낙관적','담백','직진형','짓궂은 장난','금주','혼전순결 신념','슬랭에 약함'],career:['러시아 MMA','미국 원정 훈련'],relations:[['그레이시','3개월 전 파티에서 만난 뒤 꾸준히 다가감. 이미 그녀를 여자친구라고 생각함'],['에이사','그레이시의 남자친구로 오해한 적 있으나 현재는 가벼운 면식']],secret:'서킷과 유닛의 존재를 모르는 일반인.'},
  {id:'dominic',name:'DOMINIC SILVESTRY',ko:'도미닉 실베스트리',age:32,type:'UNIT / FA',origin:'Brooklyn, USA',aff:['FA','SILENCE'],cover:'Brandon',ability:'무흔',img:'dominic',quote:'2ND GENERATION / 8TH DIVISION’S FATHER',desc:'2세대 현역 베테랑 프리에이전트. 흔적을 의도적으로 지우는 능력을 보유하며 암살·정밀 타격·저격·감시·추적·정보 침투에 특화됐다.',traits:['극도로 과묵','개인주의','감정표현 적음','협업·간섭 기피','극단적 전투 효율','낮은 팀워크'],career:['CRX 수련생','인디','8th Division · PFC','SILENCE','ZCL 잠입→정식 로스터→자진 탈단','FA','Sangre Nova','PFC','JTKF','FA'],relations:[['에이사','2세대 시절 경쟁자에서 오래된 친구로 발전. 업계에서 유일하게 신뢰하는 인간'],['그레이시','에이사의 의뢰로 확보 이전부터 추적·감시한 크로우의 딸'],['안젤리스','PFC 페어 작전에서 시작된 미완의 관계. 감정이 생겼지만 업계인과 연애하지 않는 원칙 때문에 밀어냄'],['알렉스','SILENCE 동료. 실력은 인정하지만 성격은 꺼림'],['SILENCE','서덜랜드는 존중하지만 다른 멤버들과는 대체로 불편한 관계']],secret:'PFC 극비 스쿼드 SILENCE의 현역 멤버.'},
  {id:'dustin',name:'DUSTIN IBLE',ko:'더스틴 아이블',age:null,type:'UNIT',origin:'USA',aff:['ASD','WILDCARDS COOP'],cover:'미설정',ability:'꿈',img:'dustin',quote:'ASD FOUNDER / IBLE HEIR',desc:'대대로 유닛 유전자가 발현되는 서킷 대부 가문 Ible 출신. ZCL 순혈 경력을 떠나 ASD를 창설하고 인디 세력을 확장 중이다.',traits:['꽃미남','금발·벽안','젠틀','착함','다정','II 다소 불안정','II 불안정 시 사이코 성향'],career:['ZCL 순혈','FA','Ayla를 통해 Wildcards 접촉','ASD 창설·운영','인디 세력 확장'],relations:[['에이사','에이사는 Ible가의 영향력과 자금 지원을 원함. 더스틴은 공통 목표에서만 협력'],['아일라','정략 주선으로 만났지만 첫눈에 진심으로 반해 자신의 의지로 약혼을 받아들임'],['안젤리스','대학 시절 짧게 교제. 현재 둘 다 가볍게 여김']],secret:'ZCL 붕괴를 목표로 하지만 서킷 전체 붕괴에는 관심이 없다. 이 적대 목표는 Wildcards만 아는 극비 사항이며 Hunter는 전혀 모른다.'},
  {id:'ayla',name:'AYLA CALDWELL',ko:'아일라 콜드웰',age:null,type:'UNIT',origin:'USA',aff:['ZCL','WILDCARDS COOP'],cover:'Hunter의 비서',ability:'냉각 / 미인계',img:'ayla',quote:'ZCL INNER OFFICE',desc:'헌터의 비서. 빼어난 외모와 냉담한 성격을 지녔으며 더스틴과 정략 약혼 중이다. 현재 Wildcards에 비공식 협력한다.',traits:['냉담','냉철','무감정','미인계'],career:['ZCL','Hunter의 Crow 추적 의뢰','Gracie 암살 시도','복면 Asa와 대치','Asa와 익명 접선','Wildcards 비공식 협력'],relations:[['더스틴','정치적 이해관계로 받아들인 정략결혼 상대. 태도는 냉랭함'],['에이사','친척. 그의 Wildcards 신념에 동조하지만 사이 자체는 냉담'],['그레이시','과거 Hunter 지시로 암살하려 했던 대상. 현재는 무심하게 챙김']],secret:'그레이시의 행방을 Hunter와 ZCL에서 은폐하고 Wildcards를 비공식적으로 돕는다.'},
  {id:'olivia',name:'OLIVIA BLAKE',ko:'올리비아 “리브” 블레이크',age:16,type:'NON-UNIT',origin:'Los Angeles, USA',aff:['CIVILIAN'],cover:'일반사회 민간인 / 해커',ability:'없음',img:'olivia',quote:'UNAUTHORIZED KNOWLEDGE',desc:'천재 해커이자 서킷을 알고 있는 유일한 일반사회 민간인 인지자. 에이사에게 왜곡된 헌신과 집착을 품고 있다.',traits:['천재','해커','피폐','얀데레','윤기 없는 금발','녹안','주근깨','마른 체형'],career:['10세 가족 몰살','Asa의 6개월 보호','Asa에게서 분리','해킹 독학','Asa 스토킹','서킷 존재 파악','재회'],relations:[['에이사','부모를 죽인 임무 수행자이자 6개월간 자신을 돌본 인물. 지속적으로 거절당하지만 헌신적 집착을 유지'],['그레이시','에이사가 그녀를 사랑한다고 왜곡해 견제. 다만 에이사가 원하면 그레이시를 지원']],secret:'부모는 서킷 내 경영인이었고 경쟁자가 에이사에게 가족 몰살 임무를 의뢰했다. 이후 해킹으로 에이사를 스토킹하며 서킷 자체를 알아냈다.'},
  {id:'alex',name:'ALEX DECKER',ko:'알렉스 데커',age:25,type:'UNIT',origin:'Detroit, USA',aff:['PFC','MADCAPS','SILENCE'],cover:'Logan Bennett',ability:'신기루',img:'alex',quote:'PERPETUAL PROSPECT',desc:'허상과 감각 왜곡으로 시야와 인식을 교란하는 유닛. 팀 전술, 잠입, 감시, 추적, 후방 교란에 강하며 충동적이고 도발적이다.',traits:['유쾌','유치','도발적','반항적','충동적','예의·도덕 경계 희박','전투를 즐김'],career:['9세 Observer 발굴','Madcaps','PFC','SILENCE'],relations:[['조슈아','의형제이자 파트너. 함께 있을 때 II가 안정됨'],['서덜랜드','존경하는 SILENCE 멘토'],['도미닉','성격이 맞지 않는 SILENCE 동료. Gracie 관련 비밀 일부를 공유'],['에이사','PFC 시절부터 서로 도발'],['Holler','서로 깔보며 공격적인 말을 주고받지만 이상하게 케미가 좋음']],secret:'SILENCE 자료를 통해 과거 유치장에서 만난 Gracie가 폐창고 사건의 생존자라는 사실을 뒤늦게 알아냈고 Joshua에게는 숨기고 있다.'},
  {id:'joshua',name:'JOSHUA HOLLOWAY',ko:'조슈아 “조쉬” 할로웨이',age:26,type:'UNIT',origin:'Detroit, USA',aff:['PFC','MADCAPS'],cover:'Chris Harter',ability:'우박',img:'joshua',quote:'3× DOMINION WINNER',desc:'얼음 파편과 압력을 이용한 광역 화력형 유닛. 전면전과 지속전에 강하지만 부상에는 취약하다.',traits:['유쾌','유치','직진','순진','감정적','정 많음','눈치 부족','술 좋아하지만 약함'],career:['9세 Observer 발굴','Madcaps','PFC','Dominion 3회 우승'],relations:[['알렉스','어릴 때부터 함께 자란 의형제이자 파트너. 배신·결별·파이트 인덱스 결승 재회·화해를 모두 겪음'],['스카이','5년 전 탈옥 작전에서 처음 보고 반함. 계속 거절당해도 다시 들이댐'],['안젤리스','스카이의 친구라는 이유로 우호적'],['서덜랜드','오랜 앙숙. Alex와의 관계 파탄 원인 중 하나'],['에이사','에이사가 자신을 매우 싫어하지만 본인은 별생각 없이 다가감']],secret:'과거 탈옥 사건으로 현상수배자가 되어 풀커버 신분을 사용한다.'},
  {id:'angelis',name:'ANGELIS HART',ko:'안젤리스 “앤지” 하트',age:28,type:'UNIT',origin:'USA',aff:['HOLLER','FORMER PFC'],cover:'미설정',ability:'오일',img:'angelis',quote:'HOLLER / FORMER PFC FACE',desc:'과거 PFC의 얼굴마담. 오만하고 나르시시즘이 강하며 도미닉 못지않게 리그 탈주가 잦다.',traits:['오만','나르시시즘','첩보','계략','외모지상주의','대학 시절 퀸카'],career:['PFC 탈단·입단 반복','Holler'],relations:[['도미닉','3년 전 페어 작전에서 유혹 게임으로 시작해 진심이 된 미완의 관계'],['알렉스','공격적 언사를 주고받지만 기묘하게 성격 코드가 맞음'],['조슈아','그의 순진한 태도를 가끔 웃기게 여김'],['더스틴','대학 시절 짧은 연인. 현재 둘 다 가볍게 여김']],secret:'없음'},
  {id:'sky',name:'SKY VELASCO',ko:'스카이 벨라스코',age:28,type:'UNIT / RETIRED',origin:'USA',aff:['HOLLER','FORMER PFC'],cover:'향수 사업가',ability:'향',img:'sky',quote:'RETIRED PFC FACE',desc:'PFC 성골 출신으로 현재 은퇴해 향수 사업을 한다. 독설가이며 Angelis와 붙어 다니는 절친.',traits:['독설','첩보','계략','외모지상주의','은퇴'],career:['PFC','Holler','은퇴','향수 사업'],relations:[['안젤리스','절친. 은퇴 후에도 붙어 다님'],['조슈아','5년째 구애를 거절 중. 남자로 보지 않고 자신의 취향이 아니라고 명확히 밝힘'],['에이사','편한 친구'],['레비 벨라스코','고모']],secret:'없음'}
];

const teams=[
  {name:'WILDCARDS',type:'🔒 SECRET SQUAD',sub:'ANTI-CIRCUIT / COVERT NETWORK',members:['ASA · Leader','KENNY','DAVID QUINN','NICK VEGAS','MATT VEGAS','AYLA · Coop','DUSTIN · Coop'],text:'극비 안티서킷 조직. 목표는 서킷 붕괴와 유닛의 사회적 해방이며, 현재 Gracie를 감시·보호한다. Ayla와 Dustin은 정식 멤버가 아닌 비공식 협력자다.',locked:true},
  {name:'SILENCE',type:'🔒 SECRET SQUAD',sub:'PFC COVERT INTELLIGENCE',members:['SUTHERLAND · Leader','MASON','DOMINIC','ALEX','BROOKS','HENRY'],text:'카터가 ZCL 내부 감시와 방해공작을 위해 만든 PFC의 천리안. 정보수집·위장접촉·해킹에 특화됐지만, 재정 상황과 팀 분위기 때문에 사무실에서는 포커·림보·뮤지컬 체어·푸시업 배틀이나 시비에 상당한 시간을 쓴다.',locked:true},
  {name:'MADCAPS',type:'OFFICIAL DUO',sub:'PFC / DETROIT',members:['ALEX DECKER','JOSHUA HOLLOWAY'],text:'9살에 Observer에 발굴된 디트로이트 고아 의형제 듀오. 학교교육 대신 유닛 훈련 중심으로 성장했고 2세대에 준하는 경력 연차를 보유한다. 실력과 팀워크는 뛰어나지만 사고와 공백이 많아 만년 유망주 취급을 받고 업계 평판도 나쁘다.'},
  {name:'HOLLER',type:'OFFICIAL DUO',sub:'FORMER PFC FACES',members:['ANGELIS HART','SKY VELASCO'],text:'과거 PFC의 얼굴마담이었던 절친 듀오. 빼어난 미모를 활용한 첩보와 계략에 특화됐고 외모지상주의 성향이 강하다. Madcaps를 루저 듀오라 깔보지만 네 사람은 대립적이면서도 묘하게 잘 엮인다.'}
];

const relations=[
  ['asa','kenny','close','10년 전 Asa가 Kenny의 가능성을 알아보고 업계에 남게 했다. Kenny는 Asa를 친형처럼 존경한다.'],
  ['asa','dominic','close','2세대 시절 PFC와 8th Division의 얼굴로 경쟁하다 서로를 인정한 오래된 친구.'],
  ['asa','gracie','covert','보호자·동거 관계. Crow와 비밀 연락 중이라는 사실은 Gracie에게 숨긴다.'],
  ['asa','ayla','covert','친척이자 비공식 협력자. 서로 냉담하지만 이해관계가 맞을 때 움직인다.'],
  ['asa','dustin','covert','Dustin은 ZCL 붕괴라는 공통 목표에서만 Asa와 협력한다.'],
  ['asa','sky','close','오래된 동료이자 업계 내 유일한 여사친.'],
  ['asa','olivia','hostile','Olivia의 헌신적 집착과 Asa의 반복되는 단호한 거절. 필요할 때만 해킹 도움을 받는다.'],
  ['gracie','kenny','close','Wildcards 안에서 Gracie가 가장 믿는 친구.'],
  ['gracie','ivan','romantic','Gracie의 무자각 첫사랑. Ivan은 이미 그녀를 여자친구라고 생각한다.'],
  ['gracie','ayla','covert','과거 암살 시도자에서 현재 조력자로 전환된 불편한 관계.'],
  ['gracie','olivia','hostile','Olivia가 Gracie를 Asa의 사랑 대상으로 왜곡해 견제한다.'],
  ['gracie','alex','close','과거 유치장에서 취한 채 이상하게 친해졌고 이후 Circuit 안에서 재회. Alex는 그녀의 비밀 일부를 안다.'],
  ['gracie','joshua','close','유치장에서 Alex와 함께 만난 옛 인연. Joshua는 Gracie의 정체 비밀을 모른다.'],
  ['dominic','angelis','romantic','유혹 게임에서 시작해 서로 진심이 되었지만 정식 연애로 이어지지 못한 미완의 관계.'],
  ['dominic','alex','hostile','SILENCE 동료. 실력은 인정하지만 성격이 맞지 않는다.'],
  ['dustin','ayla','romantic','Hunter가 주선한 약혼이지만 Dustin은 진심으로 사랑한다. Ayla는 정치적 이해관계로 수락했다.'],
  ['dustin','angelis','close','대학 시절 짧게 교제했고 현재는 둘 다 가볍게 여긴다.'],
  ['alex','joshua','close','의형제이자 파트너. 과거 배신과 결별을 겪었으나 7년 전 PFC Fight Index 결승 뒤 화해했다.'],
  ['alex','angelis','hostile','서로 공격적인 언사를 주고받지만 기묘하게 코드가 맞는다.'],
  ['joshua','sky','romantic','5년째 일방적 짝사랑. Sky는 처음부터 연애 감정이 없고 계속 거절한다.'],
  ['angelis','sky','close','절친 듀오 Holler.']
];

const relationDossiers=[
  {title:'IVAN × GRACIE',text:'Gracie가 Asa에게 사실상 확보된 직후 가장 불안정하던 시기에 파티에서 만났다. Ivan은 Circuit과 Crow, 능력 같은 과거를 전혀 모른 채 그녀를 대했고, 캐묻거나 구해주려 들지 않고 곁에 있었다. Gracie에게는 잠깐의 구원 같은 존재지만 누군가에게 기대면 또 잃을 거라는 공포를 넘지 못한다. Ivan은 이미 그녀를 여자친구라고 생각하며 신앙상 성적 선은 지키되 감정 표현은 적극적이다.'},
  {title:'ASA × KENNY',text:'10년 전 Kenny가 변신 능력 활용도 문제로 보조 임무만 돌며 은퇴까지 고민하던 시기, Asa와 단발 경기를 함께했다. 이미 거물이던 Asa가 Kenny의 가능성을 알아봤고 그 경험이 Kenny를 업계에 남게 했다. 이후 Kenny는 Wildcards 창설 멤버가 되었고 Asa를 친형처럼 존경한다.'},
  {title:'ASA × DOMINIC',text:'둘 다 CRX 수련생 출신이지만 당시에는 접점이 거의 없었다. 2세대 시절 Asa는 PFC의 얼굴, Dominic은 8th Division의 얼굴로 경쟁했고 Prime Scale 1위를 번갈아 차지하며 서로를 인정했다. 지금은 Dominic이 업계에서 유일하게 신뢰하는 사람이 Asa이며, Asa는 비공식 조사·침투가 필요할 때 그를 부른다.'},
  {title:'MADCAPS',text:'어릴 때부터 함께 자란 고아 의형제. 8년 전 Joshua의 Dominion 3연패로 격차가 생기고, Alex가 Sutherland에게 이끌려 SILENCE에 들어간 뒤 II 불안정까지 겹치며 Joshua 납치·폭행에 직접 가담해 결별했다. 7년 전 PFC Fight Index 결승에서 재회했고, Joshua가 마지막 공격을 망설인 틈을 Alex가 기습해 첫 1위를 차지한 뒤 화해했다.'},
  {title:'MADCAPS × GRACIE',text:'Gracie가 과거 마약사범으로 유치장에 들어갔을 때 Alex와 Joshua를 만났다. 셋 다 취해 있던 짧은 시간 동안 이상하게 친해졌고, 수년 뒤 Gracie가 Circuit 바운더리 안으로 들어오며 재회했다. Alex는 SILENCE 자료를 통해 그녀가 폐창고 사건 생존자였다는 사실을 뒤늦게 알아냈지만 Joshua에게는 비밀로 했다.'},
  {title:'JOSHUA × SKY',text:'5년 전 Madcaps 탈옥 작전에서 Sky가 간수로 위장 잠입했고 Joshua는 그녀가 PFC 측인 줄도 모른 채 첫눈에 반했다. 탈옥 후에도 계속 구애 중. Sky는 처음부터 연애감정이 없고 “남자로 안 보이고 귀찮지만 웃기긴 한 애” 정도로 본다. 거절해도 Joshua는 잠깐 상처받고 다시 들이댄다.'},
  {title:'DOMINIC × ANGELIS',text:'3년 전 PFC 페어 작전에서 시작됐다. Angelis는 반응 없는 Dominic을 무너뜨리겠다는 내기로 접근했지만 점차 진심이 되었고, Dominic 역시 동요했다. 다만 “업계인과 감정적으로 엮이면 위험하다”는 원칙 때문에 좋아하게 된 만큼 더 강하게 선을 그었다. 현재도 만나면 당시 긴장이 즉시 살아나는 미완의 관계.'},
  {title:'CROW / GRACIE',text:'Crow는 CRX 붕괴 뒤 자신의 혈통이 Observer와 ZCL의 숙청 대상이 된다고 판단해 어린 Gracie를 Levi Velasco에게 맡기고 자신과 분리했다. Levi 생전에는 숨어 지내며 가끔 딸을 보러 왔지만 Levi 암살 이후 Gracie와의 직접 접촉을 완전히 끊었다. 공식상 Crow는 행방불명이다.'}
];

const classified=[
  {title:'WILDCARDS',text:'Asa가 이끄는 극비 안티서킷 조직. Circuit 붕괴와 Unit의 사회적 해방을 목표로 하며 Gracie를 감시·보호한다.',known:'KNOWN TO: Wildcards 핵심부 · Ayla · Dustin(협력 범위 내)'},
  {title:'SILENCE',text:'PFC가 ZCL 내부 감시와 방해공작을 위해 만든 극비 정보전 스쿼드. Dominic과 Alex가 현역 멤버다.',known:'KNOWN TO: PFC 핵심부 · SILENCE 멤버'},
  {title:'CROW CONTACT',text:'Asa는 공식상 행방불명인 Crow와 비밀리에 연락 중이다. Gracie에게는 이 사실을 숨긴다.',known:'KNOWN TO: Asa · Wildcards 제한 인원 / UNKNOWN TO: Gracie'},
  {title:'DUSTIN / HOSTILE INTENT',text:'Dustin은 ZCL 붕괴를 목표로 한다. 단, Circuit 자체의 붕괴에는 관심이 없다. 이 목표는 Wildcards만 아는 극비 사항이며 Hunter는 Dustin을 적대 세력으로 인지하지 못한다.',known:'KNOWN TO: Dustin · Wildcards 제한 인원 / UNKNOWN TO: Hunter · ZCL'},
  {title:'AYLA / DOUBLE POSITION',text:'Ayla는 Hunter의 지시로 Gracie를 암살하려 했으나 이후 Asa의 Wildcards 사상에 공감해 Gracie의 행방을 ZCL에서 은폐하고 비공식 협력자가 되었다.',known:'KNOWN TO: Ayla · Asa · 제한된 Wildcards 인원'},
  {title:'OLIVIA BLAKE',text:'16세의 일반사회 민간인이지만 서킷을 알고 있는 유일한 인지자. 해킹과 Asa 스토킹을 통해 내부 세계의 존재를 스스로 파악했다.',known:'KNOWN TO: Olivia · Asa 중심의 제한된 관계자'},
  {title:'GRACIE / UNMEASURED',text:'Gracie는 미등록 Unit이며 폐창고 사건에서 능력 발현 정황이 있었으나 아직 본격 각성 전이다. 정확한 능력은 공식 미측정 상태다.',known:'KNOWN TO: Observer 관심선 · Asa · 제한된 관계자'}
];

const networkPos={asa:[570,320],kenny:[350,170],gracie:[590,535],ivan:[825,620],dominic:[835,250],dustin:[285,465],ayla:[155,310],olivia:[1005,485],alex:[1020,155],joshua:[1045,325],angelis:[750,75],sky:[505,75]};

function setPageFromHash(){
  const id=(location.hash||'#home').slice(1);
  $$('.page').forEach(p=>p.classList.remove('active-page'));
  const page=document.getElementById(id)||document.getElementById('home');
  page.classList.add('active-page');
  $$('.desktop-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${page.id}`));
  $('#mobileMenu').hidden=true;
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',setPageFromHash);

function personCard(c){
  return `<article class="person-card" data-person="${c.id}"><img src="${assets(c.img)}" alt="${c.ko}" loading="lazy"><div class="card-info"><span class="tag ${c.type.includes('UNREGISTERED')?'red':''}">${c.type}</span>${c.aff.slice(0,2).map(a=>`<span class="tag">${a}</span>`).join('')}<h3>${c.name}</h3><p>${c.age?c.age+' · ':''}${c.quote}</p></div></article>`;
}
function renderFeatured(){const ids=['asa','gracie','dominic','dustin'];$('#featuredGrid').innerHTML=ids.map(id=>personCard(characters.find(c=>c.id===id))).join('');bindPersonCards($('#featuredGrid'));}

function renderTimeline(active='gen1'){
  const tabs=$('#timelineTabs');
  tabs.innerHTML=timelines.map(t=>`<button data-era="${t.id}" class="${t.id===active?'active':''}">${t.label}</button>`).join('');
  const t=timelines.find(x=>x.id===active);
  $('#timelineDetail').innerHTML=`<div class="year">${t.era}</div><div><h3>${t.title}</h3><p>${t.desc}</p><div class="chips">${t.chips.map(c=>`<span class="chip">${c}</span>`).join('')}</div></div>`;
  $$('button',tabs).forEach(b=>b.onclick=()=>renderTimeline(b.dataset.era));
}

const systemPages={
  unit:{label:'UNIT',html:`<div class="system-intro"><div><span class="micro">UNIT DEFINITION</span><h2>태어날 때부터 분류되는 인간.</h2><p>유닛은 선천적 유전자 변이로 발생한 초인적 인간이다. 능력은 개인마다 다르며 유전자의 영향으로 심리·신경계적 불안정성이 동반될 수 있다. Observer 등록 후 의무 수련 기간(n년)을 거친다.</p></div><div><span class="micro">POSSIBLE INSTABILITY</span><div class="ii-tags"><span>공감 결여</span><span>폭력 충동</span><span>현실 왜곡</span><span>감각 중독</span><span>집착</span><span>개인차 있음</span></div></div></div>`},
  match:{label:'MATCH ASSIGNMENT',html:`<div class="process"><article class="process-card"><b>01</b><h3>REQUEST</h3><p>정부기관, 기업, 서킷 내부 조직 등의 의뢰인이 Observer로 경기(임무)를 발주한다.</p></article><article class="process-card"><b>02</b><h3>MATCHING</h3><p>리그의 매치메이커가 최신 Fight Index 등을 바탕으로 적합한 후보를 선정한다.</p></article><article class="process-card"><b>03</b><h3>OFFER</h3><p>후보 유닛의 개인 단말기로 경기 제안서가 전송된다. 리그 전속 유닛은 보통 거부권이 없다.</p></article><article class="process-card"><b>04</b><h3>SETTLEMENT</h3><p>경기 종료 후 결과를 기록하고 계약에 따라 정산한다.</p></article></div><div class="comparison"><div class="compare-card"><h4>ASA CALDWELL</h4><strong>ZCL ROSTER</strong><p>ZCL 정식 로스터로서 리그가 배정하는 경기를 수행한다.</p></div><div class="compare-card"><h4>DOMINIC SILVESTRY</h4><strong>FREE AGENT</strong><p>개인 매치메이커와 인맥을 통해 독립적으로 경기를 수주한다.</p></div></div>`},
  index:{label:'FIGHT INDEX',html:`<div class="index-grid"><div class="index-card"><span>COMBAT INDEX</span><b>CI</b><p>종합 전투력 지표. 높을수록 유리.</p></div><div class="index-card ii"><span>INSTABILITY INDEX</span><b>II ↓</b><p>심리·신경계적 불안정성. 낮을수록 유리하며 극도의 흥분·전투·스트레스 상황에서 정확한 측정이 가능하다.</p></div><div class="index-card"><span>MONTHLY</span><b>MISSION</b><p>해당 월의 경기(임무) 성과. 높을수록 유리.</p></div><div class="index-card"><span>FINAL EVALUATION</span><b>PRIME</b><p>CI, II, 월간 임무 성과를 종합한 월간 서열.</p></div></div><div class="prime-quote">“Prime Scale은 단순 전투력 순위가 아니라, Observer가 판단한 유닛의 실질적인 활용 가치다.”</div><div class="comparison"><div class="compare-card"><h4>MONTH-END PVP</h4><p>매월 말 1회 실시되는 정기 PvP 시뮬레이션. CI와 II는 Unit vs Unit 전투를 통해 평가하며 상대는 전월 Prime Scale을 기반으로 매칭된다.</p></div><div class="compare-card"><h4>ATTENDANCE</h4><p>소속 유닛은 자기 리그에서, FA는 Observer가 임시 배정한 리그에서 참가한다. 불참 시 종합 랭킹과 임무 배정에 불이익이 발생한다.</p></div><div class="compare-card"><h4>CONTROL PRIORITY</h4><p>Observer는 종합 지표로 배치 등급과 통제 우선도를 결정한다.</p></div><div class="compare-card"><h4>“GOING TO THE LAB”</h4><p>현장 활용성이 낮다고 판단된 유닛은 일정 기간 재평가 후 연구자산으로 재분류되어 Observer 연구시설로 이관될 수 있다.</p></div></div>`},
  dominion:{label:'CIRCUIT: DOMINION',html:`<div class="system-intro"><div><span class="micro">FORCE-ON-FORCE</span><h2>3인. 같은 리그. 살생 가능.</h2><p>Observer 주최 실전형 팀 전술 대회. 리그 대표 3인 팀이 Force-on-Force 모의전을 치르며 전략 점수와 생존 여부로 승패가 결정된다. FA는 리그와 단기 계약 후 출전할 수 있다.</p></div><div><span class="micro">WHY THEY ENTER</span><p>보상 체계 때문에 베테랑보다 신인급 유닛이 주로 참가를 희망한다. 최종 명단 공개 뒤 경기 전날까지 타 리그 멤버를 상대로 부상 유발·이간질 등 공작이 발생할 수 있다.</p></div></div><div class="dominion-flow"><article><b>30 DAYS</b><h3>ENTRY</h3><p>30일 동안 참가 신청. 같은 리그 유닛 3인으로 대표팀을 구성한다.</p></article><article><b>ROSTER LOCK</b><h3>PRE-EVENT</h3><p>최종 명단과 참가 신청이 확정되고 명단이 공개된다. 이후 경기 전날까지 상대 팀을 겨냥한 공작이 발생할 수 있다.</p></article><article><b>D-DAY</b><h3>DOMINION</h3><p>공작으로 3인 미만이 되어도 즉시 대체 인원이 없으면 그대로 시행될 수 있다. 최종 우승팀을 결정한다.</p></article></div><div class="reward-grid"><div><b>ECONOMIC PRIVILEGE</b><p>임무 수당 인상, 고액 청부 우선 선택권, 소속 리그와의 계약 협상 우대.</p></div><div><b>DOMINION PASS</b><p>임무 거부권, 리그 이적 우대, 독립 활동 허가, 일부 의무 평가 면제.</p></div><div><b>OBSERVER GUARANTEE 🔒</b><p>정해진 범위 안에서 Observer에 직접 요청할 수 있는 특별 청구권.</p></div></div>`}
};
function renderSystem(active='unit'){const tabs=$('#systemTabs');tabs.innerHTML=Object.entries(systemPages).map(([id,v])=>`<button data-system="${id}" class="${id===active?'active':''}">${v.label}</button>`).join('');$('#systemContent').innerHTML=systemPages[active].html;$$('button',tabs).forEach(b=>b.onclick=()=>renderSystem(b.dataset.system));}

function renderLeagues(){const grid=$('#leagueGrid');grid.innerHTML=leagues.map(l=>`<article class="league-card ${l.class||''}" data-league="${l.id}"><span class="status">${l.status}</span><h2>${l.name}</h2><p>${l.summary}</p><span class="region">${l.region}</span></article>`).join('');$$('[data-league]',grid).forEach(c=>c.onclick=()=>openLeague(c.dataset.league));}

function renderCharacterFilters(){const filters=['ALL','UNIT','NON-UNIT','ASD','ZCL','JTKF','PFC','WILDCARDS','SILENCE','FA'];$('#characterFilters').innerHTML=filters.map((f,i)=>`<button class="${i===0?'active':''}" data-filter="${f}">${f}</button>`).join('');$$('button',$('#characterFilters')).forEach(b=>b.onclick=()=>{$$('button',$('#characterFilters')).forEach(x=>x.classList.remove('active'));b.classList.add('active');renderCharacters(b.dataset.filter,$('#characterSearch').value)});}
function renderCharacters(filter='ALL',query=''){query=query.trim().toLowerCase();const list=characters.filter(c=>{const hay=[c.name,c.ko,c.type,...c.aff,c.desc,c.ability,...c.traits].join(' ').toLowerCase();const hit=!query||hay.includes(query);const f=filter==='ALL'||(filter==='UNIT'&&c.type.includes('UNIT')&&!c.type.includes('NON-UNIT'))||(filter==='NON-UNIT'&&c.type.includes('NON-UNIT'))||c.aff.some(a=>a.includes(filter))||(filter==='FA'&&c.type.includes('FA'));return hit&&f});$('#characterGrid').innerHTML=list.length?list.map(personCard).join(''):`<div class="empty">검색 결과가 없습니다.</div>`;bindPersonCards($('#characterGrid'));}
function bindPersonCards(root){$$('[data-person]',root).forEach(x=>x.onclick=()=>openPerson(x.dataset.person));}

function renderTeams(){$('#teamGrid').innerHTML=teams.map(t=>`<article class="team-card ${t.locked?'locked':''}"><span class="team-type">${t.type}</span><h2>${t.name}</h2><span class="sub">${t.sub}</span><div class="members">${t.members.map(m=>`<span>${m}</span>`).join('')}</div><p>${t.text}</p></article>`).join('');}

function openDrawer(html){$('#drawerBody').innerHTML=html;$('#detailDrawer').classList.add('open');$('#detailDrawer').setAttribute('aria-hidden','false');$('#scrim').hidden=false;document.body.style.overflow='hidden';}
function closeDrawer(){$('#detailDrawer').classList.remove('open');$('#detailDrawer').setAttribute('aria-hidden','true');$('#scrim').hidden=true;document.body.style.overflow='';}
function openPerson(id){const c=characters.find(x=>x.id===id);if(!c)return;openDrawer(`<div class="drawer-portrait"><img src="${assets(c.img)}" alt="${c.ko}"></div><div class="drawer-content"><div class="eyebrow">PERSONNEL FILE / ${c.type}</div><h1>${c.name}</h1><p class="lead">${c.desc}</p><div class="fact-grid"><div><small>AGE</small><b>${c.age??'미설정'}</b></div><div><small>ORIGIN</small><b>${c.origin}</b></div><div><small>AFFILIATION</small><b>${c.aff.join(' / ')}</b></div><div><small>FULL COVER</small><b>${c.cover}</b></div><div><small>ABILITY</small><b>${c.ability}</b></div><div><small>STATUS</small><b>${c.quote}</b></div></div><section class="drawer-section"><h3>PROFILE</h3><div class="chips">${c.traits.map(t=>`<span class="chip">${t}</span>`).join('')}</div></section><section class="drawer-section"><h3>CAREER</h3><p>${c.career.join(' → ')}</p></section><section class="drawer-section"><h3>RELATIONS</h3>${c.relations.map(r=>`<div class="relation-row"><b>${r[0]}</b><span>${r[1]}</span></div>`).join('')}</section>${c.secret&&c.secret!=='없음'?`<section class="drawer-section"><h3>🔒 CLASSIFIED</h3><p>${c.secret}</p></section>`:''}</div>`);}
function openLeague(id){const l=leagues.find(x=>x.id===id);if(!l)return;openDrawer(`<div class="drawer-content" style="padding-top:80px"><div class="eyebrow">ORGANIZATION / ${l.status}</div><h1>${l.long}</h1><p class="lead">${l.summary}</p><div class="fact-grid"><div><small>REGION</small><b>${l.region}</b></div><div><small>STATUS</small><b>${l.status}</b></div><div style="grid-column:1/-1"><small>LEADERSHIP / KEY</small><b>${l.leader}</b></div></div><section class="drawer-section"><h3>ARCHIVE NOTES</h3><ul>${l.details.map(d=>`<li>${d}</li>`).join('')}</ul></section></div>`);}

function renderNetwork(){
  const svg=$('#networkSvg');
  const lines=relations.map((r,i)=>{const [a,b,type]=r,[x1,y1]=networkPos[a],[x2,y2]=networkPos[b];return `<path class="net-line ${type}" data-rel="${a} ${b}" d="M ${x1} ${y1} Q ${(x1+x2)/2} ${(y1+y2)/2-((i%3)-1)*25} ${x2} ${y2}"/>`}).join('');
  const nodes=characters.filter(c=>networkPos[c.id]).map(c=>{const [x,y]=networkPos[c.id];return `<g class="net-node" data-net="${c.id}" transform="translate(${x},${y})"><circle r="50"></circle><image href="${assets(c.img)}" x="-39" y="-39" width="78" height="78" preserveAspectRatio="xMidYMid slice"/><text y="67">${c.name.split(' ')[0]}</text><text class="meta" y="81">${c.aff[0]}</text></g>`}).join('');
  svg.innerHTML=lines+nodes;
  const sel=$('#networkFocus');
  sel.innerHTML='<option value="all">전체 네트워크</option>'+characters.filter(c=>networkPos[c.id]).map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  sel.onchange=()=>focusNetwork(sel.value);
  $$('.net-node',svg).forEach(n=>n.onclick=()=>{sel.value=n.dataset.net;focusNetwork(n.dataset.net);openPerson(n.dataset.net)});
  focusNetwork('all');
  renderRelationDossiers();
}
function focusNetwork(id){$$('.net-node').forEach(n=>n.classList.remove('active','dim'));$$('.net-line').forEach(l=>l.classList.remove('dim'));let rels=relations;if(id!=='all'){const connected=new Set([id]);relations.forEach(r=>{if(r[0]===id)connected.add(r[1]);if(r[1]===id)connected.add(r[0]);});$$('.net-node').forEach(n=>{if(!connected.has(n.dataset.net))n.classList.add('dim');if(n.dataset.net===id)n.classList.add('active')});$$('.net-line').forEach(l=>{const [a,b]=l.dataset.rel.split(' ');if(a!==id&&b!==id)l.classList.add('dim')});rels=relations.filter(r=>r[0]===id||r[1]===id)}$('#networkNotes').innerHTML=rels.slice(0,12).map(r=>{const a=characters.find(c=>c.id===r[0])?.ko||r[0],b=characters.find(c=>c.id===r[1])?.ko||r[1];return `<article><b>${a} ↔ ${b}</b><p>${r[3]}</p></article>`}).join('');}
function renderRelationDossiers(){const wrap=$('#relationshipDossiers');if(!wrap)return;wrap.innerHTML=relationDossiers.map(d=>`<article><b>${d.title}</b><p>${d.text}</p></article>`).join('');}

function renderClassified(){$('#classifiedGrid').innerHTML=classified.map(s=>`<article class="secret-card"><span class="security">LEVEL Ω / RESTRICTED</span><h3>${s.title}</h3><p>${s.text}</p><small>${s.known}</small></article>`).join('');}

function buildSearchIndex(){return [...characters.map(c=>({type:'PERSONNEL',name:c.name,sub:c.ko,id:c.id,route:'characters'})),...leagues.map(l=>({type:'LEAGUE',name:l.name,sub:l.long,id:l.id,route:'leagues'})),...teams.map(t=>({type:'TEAM',name:t.name,sub:t.sub,route:'teams'}))];}
const searchIndex=buildSearchIndex();
function searchGlobal(q){q=q.trim().toLowerCase();if(!q){$('#globalResults').innerHTML='';return;}const r=searchIndex.filter(x=>`${x.name} ${x.sub} ${x.type}`.toLowerCase().includes(q)).slice(0,12);$('#globalResults').innerHTML=r.length?r.map((x,i)=>`<div class="search-result" data-result="${i}"><span><b>${x.name}</b><br><small>${x.sub}</small></span><small>${x.type}</small></div>`).join(''):'<div class="empty">검색 결과 없음</div>';$$('[data-result]',$('#globalResults')).forEach((el,i)=>el.onclick=()=>{const x=r[i];$('#searchModal').hidden=true;location.hash=x.route;if(x.type==='PERSONNEL')setTimeout(()=>openPerson(x.id),150);if(x.type==='LEAGUE')setTimeout(()=>openLeague(x.id),150);});}

function init(){
  renderFeatured();renderTimeline();renderSystem();renderLeagues();renderCharacterFilters();renderCharacters();renderTeams();renderNetwork();renderClassified();setPageFromHash();
  $('#characterSearch').addEventListener('input',e=>{const f=$('#characterFilters button.active')?.dataset.filter||'ALL';renderCharacters(f,e.target.value)});
  $('#drawerClose').onclick=closeDrawer;$('#scrim').onclick=closeDrawer;
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDrawer();$('#searchModal').hidden=true;}});
  $('#menuButton').onclick=()=>{$('#mobileMenu').hidden=!$('#mobileMenu').hidden};$$('#mobileMenu a').forEach(a=>a.onclick=()=>$('#mobileMenu').hidden=true);
  $('#decryptButton').onclick=()=>{$('#classifiedLocked').hidden=true;$('#classifiedGrid').hidden=false};
  $('#searchButton').onclick=()=>{$('#searchModal').hidden=false;setTimeout(()=>$('#globalSearch').focus(),50)};
  $('#searchClose').onclick=()=>$('#searchModal').hidden=true;
  $('#searchModal').onclick=e=>{if(e.target===$('#searchModal'))$('#searchModal').hidden=true};
  $('#globalSearch').addEventListener('input',e=>searchGlobal(e.target.value));
}
init();
