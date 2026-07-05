// Roomies: Chaos Happens — site content (EN / ES / RU)
// Exposed as a global for the Design Component to read.
window.ROOMIES_CONTENT = {
  langs: [
    { id: "en", label: "EN" },
    { id: "es", label: "ES" },
    { id: "ru", label: "RU" }
  ],

  // Brand colors per need + character (shared across languages)
  needsMeta: [
    { key: "sleep", icon: "💤", color: "#34B3F1" },
    { key: "food",  icon: "🍔", color: "#FF8A3D" },
    { key: "hygiene", icon: "🛁", color: "#2BC4B6" },
    { key: "fun",   icon: "🎉", color: "#FFC83D" },
    { key: "social",icon: "💬", color: "#FF4FA3" }
  ],
  charsMeta: [
    { key: "max",  color: "#FF5A3D" },
    { key: "lena", color: "#9B6BFF" },
    { key: "igor", color: "#2B9BD8" },
    { key: "anya", color: "#FFB020" }
  ],

  t: {
    en: {
      nav: { about: "The idea", chars: "Roomies", howto: "How to play", gallery: "Gallery", media: "Watch", contact: "Contact", cta: "Notify me" },
      hero: {
        badge: "Prototype ready · Coming soon",
        tagline: "Chaos happens.",
        pitch: "A light-to-medium strategy board game for 2–4 players about the gloriously chaotic experience of sharing an apartment. Manage your 5 basic needs, compete for shared rooms, and outsmart your roommates — while Chaos Happens cards throw your best plans out the window.",
        players: "2–4 players", age: "Age 6+", learn: "Easy to learn",
        cta1: "Notify me at launch", cta2: "Watch on TikTok"
      },
      status: {
        kicker: "Where we're at",
        title: "The prototype is done. The chaos is just getting started.",
        body: "Roomies: Chaos Happens is fully playtested and ready. We're now looking for partners and backers to bring it to its first production run.",
        cta: "Get in touch"
      },
      about: {
        kicker: "The idea",
        title: "Four roommates. One apartment. Zero peace and quiet.",
        body1: "Each player takes on a unique character living under the same roof, navigating shared spaces, competing schedules, blocked bathrooms, dirty dishes — and the occasional surprise from a Chaos Happens card. The twist: you're not just racing to survive, you're racing to thrive.",
        body2: "The apartment is a 2×2 grid of rooms — Kitchen, Living Room, Bedroom and Bathroom. Every turn you spend step tokens to move, act, draw cards or wait, all while fulfilling your 5 basic needs before anyone else beats you to the good stuff.",
        quote: "Life in the apartment doesn't follow a plan."
      },
      needs: {
        kicker: "The 5 needs",
        title: "Five needs. One messy apartment.",
        intro: "Every Roomie manages the same five basic needs. Fulfilling all five is required just to be eligible to win — but each one only counts the first time you meet it.",
        items: {
          sleep:   { name: "Sleep",   desc: "Grab the bed before someone else does." },
          food:    { name: "Food",    desc: "Cook a meal — or raid the fridge." },
          hygiene: { name: "Hygiene", desc: "The bathroom is always occupied. Always." },
          fun:     { name: "Fun",     desc: "Game, chill, do absolutely nothing." },
          social:  { name: "Social",  desc: "Pull up a chair at the Hang Out table." }
        }
      },
      chars: {
        kicker: "Meet the Roomies",
        title: "Pick your player.",
        intro: "Four very different roommates, each with unique bonus actions that reward leaning into their style — earned once per game, the first time it fulfills their matching need.",
        items: {
          max:  { name: "Max",  role: "The Athlete", desc: "Loves exercise and training. Bonus: Grab Coffee +2 · Get Moving +1." },
          lena: { name: "Lena", role: "The Gamer", desc: "Lives for entertainment, gadgets and snacks. Bonus: Grab a Treat +2 · Play Video Games +1." },
          igor: { name: "Igor", role: "The Musician", desc: "Guitar, music, karaoke, always. Bonus: Sing Your Heart Out +1 · Play Guitar +1." },
          anya: { name: "Anya", role: "The Housekeeper", desc: "Tidy and a great cook. Bonus: Cook a Meal +2 · Clean a Mess +1." }
        },
        note: "Character bonuses apply once per game, the first time they fulfill that character's matching need."
      },
      howto: {
        kicker: "How to play",
        title: "Easy to learn, chaotic to master.",
        steps: [
          { n: "1", title: "Pick a character", desc: "Each Roomie has a distinct personality and unique bonus actions." },
          { n: "2", title: "Move & act", desc: "Spend up to 2 step tokens per turn to move between rooms, use items, draw cards, or wait." },
          { n: "3", title: "Fulfill your needs", desc: "Meet all 5 needs to be eligible to win — but problems and blocked rooms get in the way." },
          { n: "4", title: "Chaos Happens", desc: "Play a Chaos card on yourself or anyone, any time, for free. Chaos always wins." }
        ],
        facts: [ "2–4 players", "Age 6+", "Quick to learn", "Endlessly chaotic" ]
      },
      gallery: { kicker: "From the table", title: "See it in action.", intro: "Snapshots from real games of the prototype.", drop: "Drop a game photo" },
      media: {
        kicker: "Watch the chaos",
        title: "Follow along while we build.",
        tiktokTitle: "Roomies on TikTok", tiktokDesc: "Clips, behind-the-scenes and chaos in 60 seconds.", tiktokCta: "Open TikTok",
        ytTitle: "Roomies on YouTube", ytDesc: "Full playthroughs & how-to-play.", ytCta: "Open YouTube"
      },
      notify: {
        kicker: "Don't miss launch",
        title: "Be first to know when Roomies goes on sale.",
        body: "Drop your email and we'll ping you the moment the apartment opens for sales. No spam — just one very important message.",
        placeholder: "you@email.com", button: "Notify me",
        success: "You're on the list! We'll be in touch. 🎉", error: "Please enter a valid email.",
        privacy: "We'll only use your email to tell you about the launch."
      },
      contact: {
        kicker: "Say hi",
        title: "Want to bring Roomies to the shelves?",
        body: "Partners, retailers, press or just fans — we'd love to hear from you.",
        emailLabel: "Email us", locationLabel: "Based in", location: "Buenos Aires, Argentina", socialLabel: "Follow"
      },
      faq: {
        kicker: "Good to know",
        title: "Frequently asked questions",
        items: [
          { q: "How many people can play?", a: "Roomies is built for 2 to 4 players — perfect for family game night or a chaotic evening with friends." },
          { q: "What age is it for?", a: "Ages 6 and up. It's easy enough for kids to pick up and sharp enough to keep adults scheming." },
          { q: "Can I buy it yet?", a: "Not quite! The prototype is finished and we're preparing our first production run. Join the notify list to hear the moment it's available." },
          { q: "How do you win?", a: "The game ends when everyone has fulfilled their 5 needs or run out of step tokens. Only players who completed all 5 needs are eligible — among them, most points wins." },
          { q: "What languages will it ship in?", a: "We're planning multiple languages including English, Spanish and Russian. Tell us where you are!" }
        ]
      },
      footer: { tagline: "A family board game about surviving life together.", rights: "All rights reserved.", made: "Made with chaos in Buenos Aires." }
    },

    es: {
      nav: { about: "La idea", chars: "Roomies", howto: "Cómo se juega", gallery: "Galería", media: "Míralo", contact: "Contacto", cta: "Avísame" },
      hero: {
        badge: "Prototipo listo · Próximamente",
        tagline: "Chaos happens.",
        pitch: "Un juego de mesa de estrategia liviana para 2–4 jugadores sobre la gloriosa experiencia caótica de compartir un departamento. Gestiona tus 5 necesidades básicas, compite por las habitaciones compartidas y supera a tus compañeros — mientras las cartas Chaos Happens tiran tus planes por la ventana.",
        players: "2–4 jugadores", age: "Desde 6 años", learn: "Fácil de aprender",
        cta1: "Avísame en el lanzamiento", cta2: "Ver en TikTok"
      },
      status: {
        kicker: "En qué estamos",
        title: "El prototipo está listo. El caos recién empieza.",
        body: "Roomies: Chaos Happens está totalmente probado y listo. Ahora buscamos socios y aliados para lanzar su primera tirada de producción.",
        cta: "Contáctanos"
      },
      about: {
        kicker: "La idea",
        title: "Cuatro compañeros. Un departamento. Cero tranquilidad.",
        body1: "Cada jugador es un personaje único que vive bajo el mismo techo, sorteando espacios compartidos, horarios cruzados, baños ocupados, platos sucios — y alguna que otra sorpresa de una carta Chaos Happens. La vuelta de tuerca: no solo compites por sobrevivir, compites por prosperar.",
        body2: "El departamento es una grilla de 2×2 habitaciones — Cocina, Living, Dormitorio y Baño. Cada turno gastas fichas de paso para moverte, actuar, robar cartas o esperar, mientras cubres tus 5 necesidades básicas antes de que alguien más se te adelante.",
        quote: "La vida en el departamento no sigue ningún plan."
      },
      needs: {
        kicker: "Las 5 necesidades",
        title: "Cinco necesidades. Un departamento hecho un caos.",
        intro: "Cada Roomie gestiona las mismas cinco necesidades básicas. Cubrir las cinco es requisito para poder ganar — pero cada una solo puntúa la primera vez que la cubres.",
        items: {
          sleep:   { name: "Dormir",   desc: "Toma la cama antes de que lo haga otro." },
          food:    { name: "Comida",   desc: "Cocina algo — o asalta la heladera." },
          hygiene: { name: "Higiene",  desc: "El baño siempre está ocupado. Siempre." },
          fun:     { name: "Diversión",desc: "Juega, relájate, no hagas absolutamente nada." },
          social:  { name: "Social",   desc: "Siéntate en la mesa de las Juntadas." }
        }
      },
      chars: {
        kicker: "Conoce a los Roomies",
        title: "Elige tu personaje.",
        intro: "Cuatro compañeros muy distintos, cada uno con acciones bonus únicas que premian jugar a su estilo — se ganan una vez por partida, la primera vez que cubren su necesidad correspondiente.",
        items: {
          max:  { name: "Max",  role: "El Deportista", desc: "Ama el ejercicio y entrenar. Bonus: Tomar Café +2 · Moverse +1." },
          lena: { name: "Lena", role: "La Gamer", desc: "Vive por el entretenimiento, los gadgets y los snacks. Bonus: Comer un Snack +2 · Jugar Videojuegos +1." },
          igor: { name: "Igor", role: "El Músico", desc: "Guitarra, música y karaoke, siempre. Bonus: Cantar a Todo Pulmón +1 · Tocar la Guitarra +1." },
          anya: { name: "Anya", role: "La Ordenada", desc: "Prolija y excelente cocinera. Bonus: Cocinar una Comida +2 · Limpiar un Desastre +1." }
        },
        note: "Los bonus de personaje se aplican una vez por partida, la primera vez que cubren su necesidad correspondiente."
      },
      howto: {
        kicker: "Cómo se juega",
        title: "Fácil de aprender, caótico de dominar.",
        steps: [
          { n: "1", title: "Elige un personaje", desc: "Cada Roomie tiene una personalidad distinta y acciones bonus únicas." },
          { n: "2", title: "Muévete y actúa", desc: "Gasta hasta 2 fichas de paso por turno para moverte, usar objetos, robar cartas o esperar." },
          { n: "3", title: "Cubre tus necesidades", desc: "Cubre las 5 necesidades para poder ganar — pero los problemas y habitaciones bloqueadas complican todo." },
          { n: "4", title: "Chaos Happens", desc: "Juega una carta de Caos sobre ti o cualquiera, en cualquier momento, gratis. El caos siempre gana." }
        ],
        facts: [ "2–4 jugadores", "Desde 6 años", "Rápido de aprender", "Caos sin fin" ]
      },
      gallery: { kicker: "Sobre la mesa", title: "Míralo en acción.", intro: "Imágenes de partidas reales del prototipo.", drop: "Suelta una foto del juego" },
      media: {
        kicker: "Mira el caos",
        title: "Acompáñanos mientras lo creamos.",
        tiktokTitle: "Roomies en TikTok", tiktokDesc: "Clips, detrás de escena y caos en 60 segundos.", tiktokCta: "Abrir TikTok",
        ytTitle: "Roomies en YouTube", ytDesc: "Partidas completas y cómo jugar.", ytCta: "Abrir YouTube"
      },
      notify: {
        kicker: "No te pierdas el lanzamiento",
        title: "Sé el primero en saber cuándo sale Roomies a la venta.",
        body: "Déjanos tu email y te avisamos en cuanto el departamento abra sus puertas. Sin spam — solo un mensaje muy importante.",
        placeholder: "tu@email.com", button: "Avísame",
        success: "¡Estás en la lista! Te escribiremos. 🎉", error: "Ingresa un email válido.",
        privacy: "Solo usaremos tu email para avisarte del lanzamiento."
      },
      contact: {
        kicker: "Saluda",
        title: "¿Quieres llevar Roomies a las tiendas?",
        body: "Socios, comercios, prensa o simplemente fans — nos encantaría saber de ti.",
        emailLabel: "Escríbenos", locationLabel: "Estamos en", location: "Buenos Aires, Argentina", socialLabel: "Síguenos"
      },
      faq: {
        kicker: "Bueno saberlo",
        title: "Preguntas frecuentes",
        items: [
          { q: "¿Cuántas personas pueden jugar?", a: "Roomies es para 2 a 4 jugadores — ideal para la noche de juegos en familia o una velada caótica con amigos." },
          { q: "¿Para qué edad es?", a: "Desde los 6 años. Es fácil para que los chicos lo aprendan y lo bastante ingenioso para mantener a los adultos tramando." },
          { q: "¿Ya puedo comprarlo?", a: "¡Todavía no! El prototipo está terminado y preparamos nuestra primera tirada. Únete a la lista para enterarte apenas esté disponible." },
          { q: "¿Cómo se gana?", a: "El juego termina cuando todos cubrieron sus 5 necesidades o se quedaron sin fichas de paso. Solo pueden ganar quienes cubrieron las 5 — entre ellos, gana quien tenga más puntos." },
          { q: "¿En qué idiomas saldrá?", a: "Planeamos varios idiomas, incluidos inglés, español y ruso. ¡Cuéntanos dónde estás!" }
        ]
      },
      footer: { tagline: "Un juego de mesa familiar sobre sobrevivir a la convivencia.", rights: "Todos los derechos reservados.", made: "Hecho con caos en Buenos Aires." }
    },

    ru: {
      nav: { about: "Идея", chars: "Roomies", howto: "Как играть", gallery: "Галерея", media: "Смотреть", contact: "Контакты", cta: "Сообщить" },
      hero: {
        badge: "Прототип готов · Скоро",
        tagline: "Chaos happens.",
        pitch: "Лёгкая стратегическая настольная игра для 2–4 игроков о восхитительно хаотичной жизни в общей квартире. Управляй своими 5 базовыми потребностями, борись за общие комнаты и переигрывай соседей — пока карты Chaos Happens рушат все твои планы.",
        players: "2–4 игрока", age: "От 6 лет", learn: "Лёгкие правила",
        cta1: "Сообщить о запуске", cta2: "Смотреть в TikTok"
      },
      status: {
        kicker: "Где мы сейчас",
        title: "Прототип готов. Хаос только начинается.",
        body: "Roomies: Chaos Happens полностью протестирована и готова. Сейчас мы ищем партнёров, чтобы выпустить первый тираж.",
        cta: "Связаться"
      },
      about: {
        kicker: "Идея",
        title: "Четыре соседа. Одна квартира. Ноль тишины.",
        body1: "Каждый игрок берёт уникального персонажа, живущего под одной крышей: общие пространства, пересекающиеся расписания, занятая ванная, грязная посуда — и внезапный сюрприз от карты Chaos Happens. Фишка в том, что вы не просто выживаете — вы стремитесь процветать.",
        body2: "Квартира — это сетка 2×2 комнаты: Кухня, Гостиная, Спальня и Ванная. Каждый ход вы тратите фишки шагов на перемещение, действия, взятие карт или ожидание, попутно закрывая свои 5 базовых потребностей раньше других.",
        quote: "Жизнь в квартире не идёт по плану."
      },
      needs: {
        kicker: "5 потребностей",
        title: "Пять потребностей. Одна квартира в хаосе.",
        intro: "У каждого Roomie одни и те же пять базовых потребностей. Закрыть все пять — обязательное условие для победы, но каждая засчитывается только в первый раз.",
        items: {
          sleep:   { name: "Сон",     desc: "Займи кровать раньше других." },
          food:    { name: "Еда",     desc: "Приготовь обед — или разори холодильник." },
          hygiene: { name: "Гигиена", desc: "Ванная всегда занята. Всегда." },
          fun:     { name: "Веселье", desc: "Играй, отдыхай, ничего не делай." },
          social:  { name: "Общение", desc: "Присоединяйся за столом для посиделок." }
        }
      },
      chars: {
        kicker: "Знакомься с Roomies",
        title: "Выбери своего героя.",
        intro: "Четыре очень разных соседа, у каждого уникальные бонусные действия, вознаграждающие за игру в своём стиле — раз за партию, при первом закрытии своей потребности.",
        items: {
          max:  { name: "Макс", role: "Спортсмен", desc: "Обожает тренировки. Бонус: Выпить Кофе +2 · Размяться +1." },
          lena: { name: "Лена", role: "Геймерша", desc: "Живёт развлечениями, гаджетами и снеками. Бонус: Взять Снек +2 · Играть в Видеоигры +1." },
          igor: { name: "Игорь", role: "Музыкант", desc: "Гитара, музыка, караоке — всегда. Бонус: Спеть от Души +1 · Играть на Гитаре +1." },
          anya: { name: "Аня",  role: "Хозяйка", desc: "Аккуратная и отлично готовит. Бонус: Приготовить Еду +2 · Убрать Беспорядок +1." }
        },
        note: "Бонусы персонажей применяются раз за партию, при первом закрытии соответствующей потребности."
      },
      howto: {
        kicker: "Как играть",
        title: "Легко научиться, сложно стать мастером.",
        steps: [
          { n: "1", title: "Выбери персонажа", desc: "У каждого Roomie свой характер и уникальные бонусные действия." },
          { n: "2", title: "Двигайся и действуй", desc: "Трать до 2 фишек шагов за ход на перемещение, предметы, карты или ожидание." },
          { n: "3", title: "Закрывай потребности", desc: "Закрой все 5 потребностей, чтобы иметь право на победу — но проблемы и блокировки комнат мешают." },
          { n: "4", title: "Chaos Happens", desc: "Играй карту Хаоса на себя или любого другого, в любой момент, бесплатно. Хаос всегда побеждает." }
        ],
        facts: [ "2–4 игрока", "От 6 лет", "Быстро учиться", "Бесконечный хаос" ]
      },
      gallery: { kicker: "За столом", title: "Посмотри в деле.", intro: "Кадры из реальных партий прототипа.", drop: "Перетащи фото игры" },
      media: {
        kicker: "Смотри хаос",
        title: "Следи за нами, пока мы создаём игру.",
        tiktokTitle: "Roomies в TikTok", tiktokDesc: "Клипы, закулисье и хаос за 60 секунд.", tiktokCta: "Открыть TikTok",
        ytTitle: "Roomies на YouTube", ytDesc: "Полные партии и правила игры.", ytCta: "Открыть YouTube"
      },
      notify: {
        kicker: "Не пропусти запуск",
        title: "Узнай первым, когда Roomies поступит в продажу.",
        body: "Оставь email — и мы напишем, как только квартира откроется для продаж. Без спама — только одно очень важное письмо.",
        placeholder: "you@email.com", button: "Сообщить",
        success: "Ты в списке! Мы напишем. 🎉", error: "Введите корректный email.",
        privacy: "Мы используем email только чтобы сообщить о запуске."
      },
      contact: {
        kicker: "Привет",
        title: "Хотите вывести Roomies на полки магазинов?",
        body: "Партнёры, магазины, пресса или просто фанаты — будем рады вам.",
        emailLabel: "Напишите нам", locationLabel: "Мы находимся", location: "Буэнос-Айрес, Аргентина", socialLabel: "Следите"
      },
      faq: {
        kicker: "Полезно знать",
        title: "Частые вопросы",
        items: [
          { q: "Сколько человек могут играть?", a: "Roomies рассчитана на 2–4 игроков — идеально для семейного вечера или шумной компании друзей." },
          { q: "С какого возраста?", a: "От 6 лет. Достаточно просто для детей и достаточно хитро, чтобы взрослые строили планы." },
          { q: "Уже можно купить?", a: "Пока нет! Прототип готов, мы готовим первый тираж. Подпишись на уведомления, чтобы узнать о старте продаж первым." },
          { q: "Как побеждают?", a: "Игра заканчивается, когда все закрыли свои 5 потребностей или закончились фишки шагов. Победить могут только те, кто закрыл все 5 — среди них побеждает набравший больше очков." },
          { q: "На каких языках выйдет игра?", a: "Планируем несколько языков, включая английский, испанский и русский. Расскажите, откуда вы!" }
        ]
      },
      footer: { tagline: "Семейная настольная игра о том, как ужиться вместе.", rights: "Все права защищены.", made: "Сделано с хаосом в Буэнос-Айресе." }
    }
  }
};