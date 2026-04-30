import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d2cbd6c5-ea14-4224-82f7-a50b311f182d/files/6bbfbc69-c0ce-4668-a5d3-9cd8b5ad20f4.jpg";

const updates = [
  {
    date: "29 апр 2026",
    tag: "ОБНОВЛЕНИЕ",
    title: "Машины, мини-карта и новые квесты",
    desc: "Полностью обновлён автопарк, добавлена удобная мини-карта в HUD, появились свежие сюжетные квесты с уникальными наградами.",
    icon: "Sparkles",
  },
  {
    date: "18 апр 2026",
    tag: "ОБНОВЛЕНИЕ",
    title: "Патч 4.7 — Тёмные улицы",
    desc: "Переработаны торговые зоны, добавлены новые NPC-фракции и система репутации.",
    icon: "Wrench",
  },
  {
    date: "10 апр 2026",
    tag: "ОБНОВЛЕНИЕ",
    title: "Новая карта: Промзона",
    desc: "Открыт заброшенный промышленный район с уникальными квестами и тайниками.",
    icon: "Map",
  },
  {
    date: "01 апр 2026",
    tag: "ИВЕНТ",
    title: "Ночь живых мертвецов",
    desc: "Особое событие завершилось. Победители получили уникальные предметы.",
    icon: "Skull",
  },
];

const creators = [
  {
    name: "PozziDom99",
    role: "Основатель проекта",
    desc: "Создатель Рефтинский РП. Отвечает за концепцию, развитие и душу проекта.",
    initials: "PD",
    color: "#8B0000",
  },
  {
    name: "r1mus",
    role: "Соразработчик",
    desc: "Технический архитектор сервера. Билды, скрипты, оптимизация и геймплейные системы.",
    initials: "R1",
    color: "#4a0000",
  },
];

const gameRules = [
  { code: "OSK", name: "Оскорбления", desc: "Запрещено оскорбление игроков за гранью RP. Оскорбление игроков во время NonRP.", punishment: "Бан 30 минут" },
  { code: "FreeKill", name: "Безпричинное убийство", desc: "Запрещено убийство 2-4 игроков без особой причины. Игра не заключается в убийствах.", punishment: "Бан 1 час" },
  { code: "SpawnKill", name: "Убийство на спавне", desc: "Запрещено убийство любого игрока находящегося на спавне.", punishment: "Бан 1-2 часа" },
  { code: "MassRDM", name: "Массовое убийство", desc: "Запрещено убийство 7+ игроков без особой причины.", punishment: "Бан 4 часа" },
  { code: "BugAbuse", name: "Использование багов", desc: "Запрещено использовать баги в любом их виде.", punishment: "Бан 2-12 часов" },
  { code: "Piar", name: "Реклама", desc: "Распространение рекламной информации в игровом чате.", punishment: "Бан 30 минут" },
  { code: "PowerGaming", name: "Нереалистичное поведение", desc: "Преувеличение возможностей персонажа, отсутствие страха за свою жизнь.", punishment: "Бан 1 час" },
  { code: "Читы", name: "Эксплойтинг", desc: "Намеренное использование читов, эксплойтов и трейнеров. Отказ от проверки наказуем.", punishment: "ЧС проекта" },
  { code: "FearRP", name: "Страх смерти", desc: "Не отыгровка страха смерти в опасных ситуациях.", punishment: "Бан 30 минут" },
  { code: "FreeDamage", name: "Урон без причины", desc: "Нанесение урона без адекватной причины. Допускается ответить тем же.", punishment: "Бан 30 минут" },
  { code: "NonRPC", name: "Нон-РП персонаж", desc: "Скин: предметы, животные, тонкий скин, Headless, Korblox. Анимации Levitation, Zombie.", punishment: "Бан 1 день" },
  { code: "ЕПП", name: "Езда по полям", desc: "Езда по открытым полям в обход дорог.", punishment: "Бан 10 минут" },
  { code: "NLR", name: "Правила новой жизни", desc: "Прибытие на место смерти с целью отомстить обидчикам.", punishment: "Бан 30 минут" },
  { code: "РЦД", name: "Рецидив", desc: "Массовое нарушение правил. Более 4 пунктов за 2 дня.", punishment: "Бан 3 дня" },
  { code: "Уход", name: "Уход от разбирательства", desc: "Намеренный выход во время разбирательства администратором.", punishment: "Бан 12 часов" },
  { code: "АбузФ", name: "Абуз фракции", desc: "При увольнении с фракции вам не сняли роль и вы намеренно этим пользуетесь.", punishment: "Бан 7 дней" },
  { code: "ОбхН", name: "Обход наказания", desc: "Намеренный обход через альт, разбан другом, подделка материалов невиновности.", punishment: "Бан 7-30 дней" },
  { code: "CS", name: "Car Stuck", desc: "Намеренный заход в коллизию авто для избегания урона в ПВП.", punishment: "Бан 7 дней" },
  { code: "TK", name: "Убийство союзника", desc: "Убийство игрока из своей фракции/команды.", punishment: "Jail 15 минут" },
  { code: "GZ", name: "Зелёная зона", desc: "В общественных местах с большим скоплением людей запрещено стрелять.", punishment: "Кик / Бан до 5 дней" },
  { code: "VW", name: "VipWar", desc: "Запрещено срывать тренировки фракций или находиться на них без одобрения.", punishment: "Бан 5 дней" },
  { code: "BSE", name: "Basespectate", desc: "Проникновение на территорию ОПГ/гос. фракций для слежки без объявленного рейда.", punishment: "Бан 2 дня" },
];

const textRules = [
  { name: "Спам и флуд", desc: "Запрещён спам, флуд, капслок (более 3 сообщений подряд).", punishment: "Кик / Бан 10 минут" },
  { name: "Дискриминация", desc: "Не допускается дискриминация, оскорбления, разжигание розни.", punishment: "Бан 2 часа" },
  { name: "Реклама проектов", desc: "Запрещена реклама сторонних проектов и услуг.", punishment: "Бан 1-2 месяца" },
  { name: "ООС-общение", desc: "ООС-общение только через '//'.", punishment: "Бан 30 минут" },
  { name: "Оскорбление проекта", desc: "Запрещено открытое оскорбление проекта.", punishment: "Бан от 6 месяцев до НАВСЕГДА" },
  { name: "РП в чате", desc: "Любое РП должно отыгрываться через '/me' или '*действие*'.", punishment: "Устное предупреждение" },
  { name: "Смайлики", desc: "Запрещены смайлики в чатах. Играйте без них.", punishment: "Предупреждение / Бан 1 час" },
  { name: "Мат", desc: "Нецензурная брань запрещена. Допустима в редких РП-моментах (не более 4-5 раз).", punishment: "Бан 4 часа" },
];

const faqs = [
  {
    q: "Что такое РП и как в это играть?",
    a: "РП (ролевая игра) — это когда ты отыгрываешь персонажа, а не просто управляешь им. Говоришь от его лица, принимаешь решения исходя из его характера и истории. Новичкам поможем — заходи и спрашивай.",
  },
  {
    q: "Как начать играть?",
    a: "Зайди в Roblox, найди «Рефтинский РП» через поиск или перейди по ссылке. После входа в игру прочитай правила и создай своего персонажа — имя, предыстория, характер.",
  },
  {
    q: "Игра бесплатная?",
    a: "Да, полностью бесплатно. Донат — только косметика, никакого пей-ту-вин. Твой успех зависит от умения отыгрывать, а не от кошелька.",
  },
  {
    q: "Можно ли играть злодея или бандита?",
    a: "Можно и нужно — злодеи делают РП живым. Главное соблюдать правила отыгрыша: не гриферить без смысла и уважать других игроков вне роли.",
  },
  {
    q: "Что делать, если кто-то нарушает атмосферу игры?",
    a: "Пожалуйся в канале #жалобы нашего Discord с описанием ситуации и скриншотами. Модераторы разберутся в течение 24 часов.",
  },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useIntersection();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const ADMIN_PASSWORD = "crown";
const DISCORD_URL = "https://discord.gg/3NtM3N5b";

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [adminError, setAdminError] = useState("");
  const [videos, setVideos] = useState<{ id: number; title: string; url: string }[]>([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const seen = sessionStorage.getItem("welcomed");
    if (!seen) {
      setShowWelcome(true);
      sessionStorage.setItem("welcomed", "1");
    }
    if (localStorage.getItem("isAdmin") === "1") setIsAdmin(true);
    const saved = localStorage.getItem("videos");
    if (saved) {
      try { setVideos(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const handleAdminLogin = () => {
    if (adminInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "1");
      setAdminError("");
      setAdminInput("");
    } else {
      setAdminError("Неверный пароль");
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  };

  const handleVideoUpload = () => {
    if (!videoFile || !videoTitle) return;
    const url = URL.createObjectURL(videoFile);
    const next = [...videos, { id: Date.now(), title: videoTitle, url }];
    setVideos(next);
    localStorage.setItem("videos", JSON.stringify(next.map(v => ({ ...v }))));
    setVideoTitle("");
    setVideoFile(null);
  };

  const handleVideoDelete = (id: number) => {
    const next = videos.filter(v => v.id !== id);
    setVideos(next);
    localStorage.setItem("videos", JSON.stringify(next));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0d8d0] scanlines overflow-x-hidden">

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrollY > 60 ? "rgba(8,8,8,0.97)" : "transparent",
          borderBottom: scrollY > 60 ? "1px solid rgba(139,0,0,0.3)" : "none",
          backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-heading text-2xl tracking-widest blood-glow text-[#c0392b]">
            РЕФТИНСКИЙ РП
          </span>
          <div className="hidden md:flex items-center gap-8">
            {[
              ["#about", "О ИГРЕ"],
              ["#newmap", "ОБНОВЛЕНИЕ"],
              ["#updates", "ХРОНИКА"],
              ["#creators", "КОМАНДА"],
              ["#admin", "АДМИН"],
              ["#rules", "ПРАВИЛА"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="font-heading text-sm tracking-widest text-[#a09080] hover:text-[#c0392b] transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex font-heading text-sm tracking-widest px-4 py-2 text-[#e0d8d0] border border-[#5865F2] hover:bg-[#5865F2] transition-all duration-300 items-center gap-2"
              style={{ boxShadow: "0 0 10px rgba(88,101,242,0.3)" }}
            >
              <Icon name="MessageCircle" size={14} />
              DISCORD
            </a>
            <a
              href="#"
              className="font-heading text-sm tracking-widest px-5 py-2 text-[#e0d8d0] border border-[#8B0000] hover:bg-[#8B0000] transition-all duration-300"
              style={{ boxShadow: "0 0 10px rgba(139,0,0,0.3)" }}
            >
              ИГРАТЬ
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            transform: `translateY(${scrollY * 0.4}px)`,
            filter: "brightness(0.25) contrast(1.2)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 50%, rgba(10,10,10,0.95) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(139,0,0,0.25) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div
            className="inline-block font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-6 px-4 py-1 border border-[#8B0000]/40"
            style={{ animation: "fade-up 0.6s ease-out forwards", opacity: 0 }}
          >
            ROLEPLAY GAME ● ROBLOX
          </div>
          <h1
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-4 text-[#e8e0d8]"
            style={{ animation: "fade-up 0.8s ease-out 0.2s forwards", opacity: 0, letterSpacing: "-0.02em" }}
          >
            РЕФТИНСКИЙ
            <br />
            <span className="blood-glow text-[#c0392b]">РП</span>
          </h1>
          <p
            className="font-body text-lg text-[#a09080] max-w-xl mx-auto mb-10 leading-relaxed italic"
            style={{ animation: "fade-up 0.8s ease-out 0.4s forwards", opacity: 0 }}
          >
            Войди в мир, где каждый твой шаг имеет цену. Живи по своим правилам — или умри по чужим.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fade-up 0.8s ease-out 0.6s forwards", opacity: 0 }}
          >
            <a
              href="#"
              className="font-heading tracking-widest px-8 py-4 text-[#e0d8d0] text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #8B0000, #5a0000)",
                boxShadow: "0 0 20px rgba(139,0,0,0.5), 0 0 40px rgba(139,0,0,0.2)",
              }}
            >
              НАЧАТЬ ИГРУ
            </a>
            <a
              href="#about"
              className="font-heading tracking-widest px-8 py-4 text-[#a09080] text-sm border border-[#3a3a3a] hover:border-[#8B0000] hover:text-[#e0d8d0] transition-all duration-300"
            >
              УЗНАТЬ БОЛЬШЕ
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-heading text-xs tracking-widest text-[#8B0000]">ЛИСТАЙ</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#8B0000] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-3">01 / О СЕРВЕРЕ</div>
                <h2 className="font-heading text-5xl md:text-6xl font-bold text-[#e8e0d8] mb-6 leading-tight">
                  МИР НА<br />
                  <span className="text-[#c0392b]">ГРАНИ</span><br />
                  ОБРЫВА
                </h2>
                <p className="font-body text-[#a09080] leading-relaxed mb-6">
                  Рефтинский РП — глубокая ролевая игра в Roblox. Здесь ты не просто
                  играешь — ты живёшь. Строишь биографию, заводишь врагов и союзников,
                  торгуешь, предаёшь и мстишь.
                </p>
                <p className="font-body text-[#7a7068] leading-relaxed mb-8">
                  Забудь про скрипты и квесты. Каждая ситуация рождается в живом диалоге
                  между игроками. Ты сам решаешь кем быть — уличным бандитом, серым кардиналом,
                  честным копом или молчаливым наёмником. История пишется здесь и сейчас.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { val: "3+", label: "года онлайн" },
                    { val: "5K+", label: "игроков всего" },
                    { val: "200+", label: "онлайн в пике" },
                  ].map(({ val, label }) => (
                    <div key={label} className="text-center blood-border p-4">
                      <div className="font-heading text-3xl text-[#c0392b] blood-glow">{val}</div>
                      <div className="font-body text-xs text-[#7a7068] mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div
                  className="relative overflow-hidden"
                  style={{ boxShadow: "0 0 60px rgba(139,0,0,0.2)" }}
                >
                  <img
                    src={HERO_IMAGE}
                    alt="Атмосфера сервера"
                    className="w-full object-cover"
                    style={{ height: "400px", filter: "brightness(0.5) contrast(1.1) saturate(0.8)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(139,0,0,0.15) 0%, transparent 60%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="font-heading text-xs tracking-widest text-[#8B0000] mb-1">СЕЙЧАС ОНЛАЙН</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#c0392b] animate-pulse" />
                      <span className="font-heading text-2xl text-[#e0d8d0]">143 игрока</span>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute -top-3 -right-3 w-24 h-24 border border-[#8B0000]/30"
                  style={{ boxShadow: "0 0 20px rgba(139,0,0,0.1)" }}
                />
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      <div className="section-divider mx-12" />

      {/* NEW MAP */}
      <section id="newmap" className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(139,0,0,0.08) 0%, transparent 60%)" }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeSection>
            <div className="mb-14 text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <span
                  className="font-heading text-[10px] tracking-widest px-3 py-1 animate-pulse"
                  style={{
                    background: "rgba(139,0,0,0.25)",
                    color: "#ff6b6b",
                    border: "1px solid rgba(139,0,0,0.5)",
                    boxShadow: "0 0 15px rgba(139,0,0,0.3)",
                  }}
                >
                  ● СКОРО
                </span>
                <span className="font-heading text-xs tracking-[0.4em] text-[#8B0000]">02 / ОБНОВЛЕНИЕ</span>
              </div>
              <h2 className="font-heading text-5xl md:text-7xl font-bold text-[#e8e0d8] leading-tight mb-4">
                ГРЯДЁТ<br />
                <span className="text-[#c0392b] blood-glow">НОВАЯ ЭПОХА</span>
              </h2>
              <p className="font-body text-base text-[#a09080] max-w-2xl mx-auto leading-relaxed italic">
                Мир Рефтинского переписывается с нуля. Новая карта, новый движок,
                новые возможности. Готовься — старая жизнь закончилась.
              </p>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "LayoutDashboard",
                title: "НОВЫЕ GUI",
                desc: "Полностью переработанный интерфейс. Удобнее, быстрее, атмосфернее. Каждый элемент управления продуман до мелочей.",
                num: "01",
              },
              {
                icon: "Sparkles",
                title: "НОВАЯ ГРАФИКА",
                desc: "Обновлённая визуальная составляющая: освещение, тени, текстуры. Город ожил в новом свете и стал по-настоящему мрачным.",
                num: "02",
              },
              {
                icon: "Zap",
                title: "НОВАЯ ОПТИМИЗАЦИЯ",
                desc: "Стабильный FPS даже на слабых ПК. Серверный лаг сведён к минимуму. Играй без задержек и просадок.",
                num: "03",
              },
              {
                icon: "Car",
                title: "НОВЫЕ МАШИНЫ",
                desc: "Полностью свежий автопарк: от потрёпанных жигулей до бронированных внедорожников. Каждая со своим характером и звуком.",
                num: "04",
              },
              {
                icon: "Map",
                title: "НОВАЯ КАРТА",
                desc: "Огромный город с заброшенными районами, промзонами, тёмными переулками и тайными убежищами. Каждый угол хранит историю.",
                num: "05",
              },
              {
                icon: "Users",
                title: "НОВЫЕ РАЗРАБОТЧИКИ",
                desc: "В команду пришли опытные ребята. Больше идей, быстрее обновления, выше качество. Проект выходит на новый уровень.",
                num: "06",
              },
            ].map((f, i) => (
              <FadeSection key={i} delay={i * 100}>
                <div
                  className="group relative p-7 h-full transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, #111111 0%, #0a0a0a 100%)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,0,0,0.5)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(139,0,0,0.15)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 flex items-center justify-center"
                      style={{
                        background: "rgba(139,0,0,0.15)",
                        border: "1px solid rgba(139,0,0,0.35)",
                      }}
                    >
                      <Icon name={f.icon as "Map"} size={20} className="text-[#c0392b]" />
                    </div>
                    <span className="font-heading text-3xl text-[#1a1a1a] group-hover:text-[#8B0000] transition-colors duration-500">
                      {f.num}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg tracking-wider text-[#e0d8d0] mb-3 group-hover:text-[#c0392b] transition-colors">
                    {f.title}
                  </h3>
                  <p className="font-body text-sm text-[#7a7068] leading-relaxed">
                    {f.desc}
                  </p>
                  <div
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#8B0000] to-transparent transition-all duration-700"
                    style={{ width: "0%" }}
                  />
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection delay={300}>
            <div className="mt-12 text-center">
              <div
                className="inline-flex items-center gap-4 px-8 py-4"
                style={{
                  background: "linear-gradient(135deg, rgba(139,0,0,0.15), rgba(139,0,0,0.05))",
                  border: "1px solid rgba(139,0,0,0.3)",
                }}
              >
                <Icon name="Clock" size={18} className="text-[#c0392b]" />
                <span className="font-heading text-sm tracking-widest text-[#e0d8d0]">
                  ОЖИДАЕМЫЙ РЕЛИЗ — ЛЕТО 2026
                </span>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      <div className="section-divider mx-12" />

      {/* UPDATES */}
      <section id="updates" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="mb-14 flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-3">03 / ХРОНИКА</div>
                <h2 className="font-heading text-5xl md:text-6xl font-bold text-[#e8e0d8] leading-tight">
                  ПОСЛЕДНИЕ<br />
                  <span className="text-[#c0392b]">СОБЫТИЯ</span>
                </h2>
              </div>
              <a
                href="#"
                className="font-heading text-xs tracking-widest text-[#8B0000] border-b border-[#8B0000]/50 pb-1 hover:text-[#c0392b] transition-colors"
              >
                ВСЕ ЗАПИСИ →
              </a>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-2 gap-4">
            {updates.map((u, i) => (
              <FadeSection key={i} delay={i * 100}>
                <div
                  className="group relative p-6 cursor-pointer transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, #111111 0%, #0d0d0d 100%)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(139,0,0,0.15)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,0,0,0.4)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)";
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
                      style={{ background: "rgba(139,0,0,0.15)", border: "1px solid rgba(139,0,0,0.3)" }}
                    >
                      <Icon name={u.icon as "Flame"} size={18} className="text-[#8B0000]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span
                          className="font-heading text-[10px] tracking-widest px-2 py-0.5"
                          style={{
                            background: u.tag === "ИВЕНТ" ? "rgba(139,0,0,0.3)" : "rgba(40,40,40,0.8)",
                            color: u.tag === "ИВЕНТ" ? "#c0392b" : "#7a7068",
                            border: u.tag === "ИВЕНТ" ? "1px solid rgba(139,0,0,0.4)" : "1px solid rgba(80,80,80,0.3)",
                          }}
                        >
                          {u.tag}
                        </span>
                        <span className="font-body text-xs text-[#4a4640]">{u.date}</span>
                      </div>
                      <h3 className="font-heading text-lg text-[#e0d8d0] mb-2 group-hover:text-[#c0392b] transition-colors">
                        {u.title}
                      </h3>
                      <p className="font-body text-sm text-[#7a7068] leading-relaxed">{u.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-12" />

      {/* CREATORS */}
      <section id="creators" className="py-24 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(139,0,0,0.05) 0%, transparent 60%)" }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeSection>
            <div className="mb-14 text-center">
              <div className="font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-3">04 / КОМАНДА</div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#e8e0d8] leading-tight">
                ГЛАВНЫЕ ВЕРХОВНЫЕ<br />
                <span className="text-[#c0392b]">СОЗДАТЕЛИ</span>
              </h2>
            </div>
          </FadeSection>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {creators.map((c, i) => (
              <FadeSection key={i} delay={i * 120}>
                <div
                  className="group relative p-8 text-center transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, #111111 0%, #0d0d0d 100%)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(139,0,0,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,0,0,0.4)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)";
                  }}
                >
                  <div className="relative w-24 h-24 mx-auto mb-5">
                    <div
                      className="absolute -top-7 left-1/2 -translate-x-1/2 z-10"
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(255, 200, 50, 0.7)) drop-shadow(0 0 15px rgba(192, 57, 43, 0.5))",
                        animation: "flicker 3s infinite",
                      }}
                    >
                      <Icon name="Crown" size={32} className="text-[#FFD700]" />
                    </div>
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center font-heading text-3xl text-[#e0d8d0] font-bold relative"
                      style={{
                        background: `radial-gradient(circle, ${c.color}99 0%, ${c.color}44 100%)`,
                        border: `2px solid #FFD70066`,
                        boxShadow: `0 0 30px ${c.color}66, 0 0 20px rgba(255, 215, 0, 0.2)`,
                      }}
                    >
                      {c.initials}
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl text-[#e0d8d0] mb-1 group-hover:text-[#c0392b] transition-colors tracking-wide">
                    {c.name}
                  </h3>
                  <div className="font-heading text-xs tracking-widest text-[#8B0000] mb-4">{c.role}</div>
                  <p className="font-body text-sm text-[#7a7068] leading-relaxed">{c.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-12" />

      {/* HEAD ADMIN */}
      <section id="admin" className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(139,0,0,0.12) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent 0, transparent 60px, rgba(139,0,0,0.04) 60px, rgba(139,0,0,0.04) 61px)",
          }}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <FadeSection>
            <div className="mb-12 text-center">
              <div className="font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-3">05 / ВЛАСТЬ</div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#e8e0d8] leading-tight">
                ГЛАВНЫЙ<br />
                <span className="text-[#c0392b]">АДМИНИСТРАТОР</span>
              </h2>
            </div>
          </FadeSection>

          <FadeSection delay={150}>
            <div
              className="relative p-10 md:p-14 text-center overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0f0a0a 0%, #0a0505 100%)",
                border: "1px solid rgba(139, 0, 0, 0.4)",
                boxShadow: "0 0 60px rgba(139, 0, 0, 0.15), inset 0 0 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Декоративные углы */}
              {[
                "top-3 left-3 border-t border-l",
                "top-3 right-3 border-t border-r",
                "bottom-3 left-3 border-b border-l",
                "bottom-3 right-3 border-b border-r",
              ].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-6 h-6`}
                  style={{ borderColor: "rgba(255, 215, 0, 0.5)" }}
                />
              ))}

              {/* Корона большая сверху */}
              <div
                className="relative inline-block mb-2"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(255, 200, 50, 0.9)) drop-shadow(0 0 30px rgba(192, 57, 43, 0.6))",
                  animation: "flicker 3s infinite",
                }}
              >
                <Icon name="Crown" size={56} className="text-[#FFD700]" />
              </div>

              {/* Аватар */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div
                  className="absolute inset-0 rounded-full animate-spin"
                  style={{
                    background: "conic-gradient(from 0deg, #FFD700, #c0392b, #FFD700, #8B0000, #FFD700)",
                    animationDuration: "8s",
                    padding: "3px",
                  }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center font-heading text-4xl text-[#FFD700] font-bold"
                    style={{
                      background: "radial-gradient(circle, #1a0a0a 0%, #0a0505 100%)",
                      boxShadow: "inset 0 0 30px rgba(139, 0, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.3)",
                    }}
                  >
                    MC
                  </div>
                </div>
              </div>

              {/* Бейдж */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1 mb-4"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(139, 0, 0, 0.15))",
                  border: "1px solid rgba(255, 215, 0, 0.4)",
                }}
              >
                <Icon name="Shield" size={12} className="text-[#FFD700]" />
                <span className="font-heading text-[10px] tracking-[0.3em] text-[#FFD700]">
                  ГОЛОВА ПРОЕКТА
                </span>
              </div>

              <h3
                className="font-heading text-4xl md:text-5xl text-[#e8e0d8] mb-2 tracking-wide"
                style={{
                  textShadow: "0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(192, 57, 43, 0.3)",
                }}
              >
                Mr_Crown
              </h3>
              <div className="font-heading text-sm tracking-[0.3em] text-[#FFD700] mb-6">
                ГЛАВНЫЙ АДМИНИСТРАТОР
              </div>

              <p className="font-body text-base text-[#a09080] leading-relaxed max-w-lg mx-auto mb-8 italic">
                Хранитель порядка Рефтинского. Последнее слово в любых спорах,
                рука закона на этих улицах. Его решения — окончательны.
              </p>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                {[
                  { val: "∞", label: "полномочия" },
                  { val: "24/7", label: "на связи" },
                  { val: "1", label: "слово" },
                ].map(({ val, label }) => (
                  <div
                    key={label}
                    className="p-3"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255, 215, 0, 0.15)",
                    }}
                  >
                    <div className="font-heading text-2xl text-[#FFD700]">{val}</div>
                    <div className="font-body text-[10px] text-[#7a7068] tracking-widest uppercase">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      <div className="section-divider mx-12" />

      {/* RULES */}
      <section id="rules" className="py-24 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(139,0,0,0.06) 0%, transparent 50%)" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeSection>
            <div className="mb-14 text-center">
              <div className="font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-3">06 / ЗАКОН</div>
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-[#e8e0d8] leading-tight mb-4">
                ПРАВИЛА<br />
                <span className="text-[#c0392b]">ПРОЕКТА</span>
              </h2>
              <p className="font-body text-sm text-[#7a7068] max-w-xl mx-auto leading-relaxed">
                Незнание правил не освобождает от ответственности. Заходя на сервер,
                вы автоматически соглашаетесь их соблюдать.
              </p>
            </div>
          </FadeSection>

          {/* Игровые правила */}
          <FadeSection>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-[#8B0000]" />
              <span className="font-heading text-sm tracking-[0.3em] text-[#c0392b]">ИГРОВЫЕ ПРАВИЛА</span>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-2 gap-3 mb-16">
            {gameRules.map((r, i) => (
              <FadeSection key={i} delay={Math.min(i * 30, 300)}>
                <div
                  className="group relative p-5 transition-all duration-300 h-full"
                  style={{
                    background: "linear-gradient(135deg, #0f0f0f 0%, #0a0a0a 100%)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,0,0,0.4)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(139,0,0,0.1)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-start gap-3 mb-2 flex-wrap">
                    <span className="font-heading text-[10px] tracking-widest text-[#4a4640]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-heading text-xs tracking-widest px-2 py-0.5"
                      style={{
                        background: "rgba(139,0,0,0.15)",
                        color: "#c0392b",
                        border: "1px solid rgba(139,0,0,0.3)",
                      }}
                    >
                      {r.code}
                    </span>
                    <span className="font-heading text-sm text-[#e0d8d0]">{r.name}</span>
                  </div>
                  <p className="font-body text-xs text-[#7a7068] leading-relaxed mb-3 pl-7">
                    {r.desc}
                  </p>
                  <div className="flex items-center gap-2 pl-7">
                    <Icon name="Ban" size={12} className="text-[#8B0000]" />
                    <span className="font-heading text-[11px] tracking-wider text-[#8B0000]">
                      {r.punishment}
                    </span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>

          {/* Текстовые правила */}
          <FadeSection>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-8 h-px bg-[#8B0000]" />
              <span className="font-heading text-sm tracking-[0.3em] text-[#c0392b]">ТЕКСТОВЫЕ ПРАВИЛА</span>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-2 gap-3 mb-16">
            {textRules.map((r, i) => (
              <FadeSection key={i} delay={Math.min(i * 40, 200)}>
                <div
                  className="group relative p-5 transition-all duration-300 h-full"
                  style={{
                    background: "linear-gradient(135deg, #0f0f0f 0%, #0a0a0a 100%)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,0,0,0.4)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)";
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="MessageSquare" size={14} className="text-[#8B0000]" />
                    <span className="font-heading text-sm text-[#e0d8d0]">{r.name}</span>
                  </div>
                  <p className="font-body text-xs text-[#7a7068] leading-relaxed mb-3">
                    {r.desc}
                  </p>
                  <div className="flex items-center gap-2">
                    <Icon name="Ban" size={12} className="text-[#8B0000]" />
                    <span className="font-heading text-[11px] tracking-wider text-[#8B0000]">
                      {r.punishment}
                    </span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>

          {/* Примечания */}
          <FadeSection>
            <div
              className="p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0f0808 0%, #0a0505 100%)",
                border: "1px solid rgba(139,0,0,0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Icon name="AlertTriangle" size={20} className="text-[#c0392b]" />
                <span className="font-heading text-sm tracking-[0.3em] text-[#c0392b]">ПРИМЕЧАНИЯ</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Администрация имеет полное право выдать наказание на своё усмотрение.",
                  "Правила могут изменяться в любой момент без уведомления игроков.",
                  "При частом нарушении правил наказание увеличивается.",
                  "Администрация вправе прекратить доступ к серверу без объяснения причин.",
                  "При осознании вины игрок может быть разбанен на усмотрение администрации.",
                  "За нарушения с вашего аккаунта отвечаете лично вы — независимо от того, кто играл.",
                ].map((note, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-sm text-[#a09080] leading-relaxed">
                    <span className="text-[#8B0000] mt-1">▸</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#1a0a0a] font-heading text-xs tracking-widest text-[#4a4640]">
                ПОСЛЕДНЕЕ ОБНОВЛЕНИЕ: 17.04.2026
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      <div className="section-divider mx-12" />

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <FadeSection>
            <div className="mb-14 text-center">
              <div className="font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-3">07 / ВОПРОСЫ</div>
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-[#e8e0d8] leading-tight">
                ЧАСТО<br />
                <span className="text-[#c0392b]">СПРАШИВАЮТ</span>
              </h2>
            </div>
          </FadeSection>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FadeSection key={i} delay={i * 80}>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #111111 0%, #0d0d0d 100%)",
                    border: openFaq === i ? "1px solid rgba(139,0,0,0.4)" : "1px solid rgba(255,255,255,0.04)",
                    boxShadow: openFaq === i ? "0 0 20px rgba(139,0,0,0.1)" : "none",
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-heading text-base text-[#e0d8d0] pr-4">{faq.q}</span>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={18}
                      className="flex-shrink-0 text-[#8B0000] transition-transform duration-300"
                    />
                  </button>
                  <div
                    style={{
                      maxHeight: openFaq === i ? "200px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.4s ease",
                    }}
                  >
                    <p className="font-body text-[#7a7068] px-5 pb-5 leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-heading text-xl tracking-widest blood-glow text-[#c0392b] mb-1">
              РЕФТИНСКИЙ РП
            </div>
            <div className="font-body text-xs text-[#4a4640]">Minecraft Roleplay Server © 2026</div>
          </div>
          <div className="flex items-center gap-6">
            {[
              { icon: "MessageCircle", label: "Discord", href: DISCORD_URL },
              { icon: "Send", label: "Telegram", href: "#" },
              { icon: "Monitor", label: "VK", href: "#" },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-2 text-[#4a4640] hover:text-[#c0392b] transition-colors duration-300"
              >
                <Icon name={icon as "MessageCircle"} size={16} />
                <span className="font-heading text-xs tracking-widest">{label}</span>
              </a>
            ))}
          </div>
          <div className="font-heading text-xs tracking-widest text-[#3a3a3a]">
            ROBLOX ROLEPLAY © 2026
          </div>
        </div>
      </footer>

      {/* ADMIN PANEL — внизу сайта, доступ только по паролю */}
      <section id="admin-panel" className="py-20 px-6 relative border-t border-[#1a0a0a]">
        <div className="max-w-4xl mx-auto">
          {!isAdmin ? (
            <div className="text-center">
              <div className="font-heading text-xs tracking-[0.4em] text-[#3a3a3a] mb-3">
                СЛУЖЕБНЫЙ ВХОД
              </div>
              <h3 className="font-heading text-2xl text-[#5a5048] mb-6">Зона администрации</h3>
              <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
                <input
                  type="password"
                  value={adminInput}
                  onChange={(e) => setAdminInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  placeholder="Пароль"
                  className="flex-1 bg-[#0f0a0a] border border-[#2a1a1a] px-4 py-2 text-[#e0d8d0] font-body text-sm focus:outline-none focus:border-[#8B0000]"
                />
                <button
                  onClick={handleAdminLogin}
                  className="font-heading text-xs tracking-widest px-4 py-2 border border-[#8B0000] text-[#e0d8d0] hover:bg-[#8B0000] transition-all"
                >
                  ВОЙТИ
                </button>
              </div>
              {adminError && (
                <div className="mt-3 font-body text-xs text-[#c0392b]">{adminError}</div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="font-heading text-xs tracking-[0.4em] text-[#FFD700] mb-2">
                    АДМИН-ПАНЕЛЬ
                  </div>
                  <h3 className="font-heading text-3xl text-[#e8e0d8] flex items-center gap-3">
                    <Icon name="Crown" size={28} className="text-[#FFD700]" />
                    Панель Mr_Crown
                  </h3>
                </div>
                <button
                  onClick={handleAdminLogout}
                  className="font-heading text-xs tracking-widest px-4 py-2 border border-[#3a3a3a] text-[#a09080] hover:border-[#c0392b] hover:text-[#c0392b] transition-all"
                >
                  ВЫЙТИ
                </button>
              </div>

              <div
                className="p-8 mb-8"
                style={{
                  background: "linear-gradient(135deg, #0f0a0a 0%, #0a0505 100%)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                }}
              >
                <h4 className="font-heading text-lg text-[#FFD700] mb-4 flex items-center gap-2">
                  <Icon name="Upload" size={18} />
                  Загрузка видео
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Название видео"
                    className="w-full bg-[#0a0505] border border-[#2a1a1a] px-4 py-2 text-[#e0d8d0] font-body text-sm focus:outline-none focus:border-[#FFD700]"
                  />
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    className="w-full bg-[#0a0505] border border-[#2a1a1a] px-4 py-2 text-[#a09080] font-body text-sm file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-[#8B0000] file:text-[#e0d8d0] file:font-heading file:text-xs file:tracking-widest hover:file:bg-[#c0392b]"
                  />
                  <button
                    onClick={handleVideoUpload}
                    disabled={!videoFile || !videoTitle}
                    className="font-heading text-xs tracking-widest px-5 py-2 border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#0a0505] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ЗАГРУЗИТЬ
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-heading text-lg text-[#e8e0d8] mb-4">
                  Загруженные видео ({videos.length})
                </h4>
                {videos.length === 0 ? (
                  <div className="font-body text-sm text-[#5a5048] italic">
                    Пока ничего не загружено
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {videos.map((v) => (
                      <div
                        key={v.id}
                        className="p-4 border border-[#2a1a1a] bg-[#0f0a0a]"
                      >
                        <video src={v.url} controls className="w-full mb-3" />
                        <div className="flex items-center justify-between">
                          <div className="font-heading text-sm text-[#e0d8d0] truncate">
                            {v.title}
                          </div>
                          <button
                            onClick={() => handleVideoDelete(v.id)}
                            className="text-[#7a7068] hover:text-[#c0392b] transition-colors"
                          >
                            <Icon name="Trash2" size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WELCOME MODAL */}
      {showWelcome && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
            animation: "fadeIn 0.4s ease",
          }}
          onClick={() => setShowWelcome(false)}
        >
          <div
            className="relative max-w-lg w-full p-10 text-center"
            style={{
              background: "linear-gradient(135deg, #0f0a0a 0%, #0a0505 100%)",
              border: "1px solid rgba(139, 0, 0, 0.5)",
              boxShadow: "0 0 80px rgba(139, 0, 0, 0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {[
              "top-2 left-2 border-t border-l",
              "top-2 right-2 border-t border-r",
              "bottom-2 left-2 border-b border-l",
              "bottom-2 right-2 border-b border-r",
            ].map((p, i) => (
              <div
                key={i}
                className={`absolute ${p} w-5 h-5`}
                style={{ borderColor: "rgba(192, 57, 43, 0.6)" }}
              />
            ))}

            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-3 right-3 text-[#5a5048] hover:text-[#c0392b] transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            <div
              className="inline-block mb-4"
              style={{ filter: "drop-shadow(0 0 20px rgba(192, 57, 43, 0.7))" }}
            >
              <Icon name="Skull" size={48} className="text-[#c0392b]" />
            </div>

            <div className="font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-3">
              ДОБРО ПОЖАЛОВАТЬ
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-[#e8e0d8] mb-4 leading-tight">
              ПРИВЕТСТВУЕМ В<br />
              <span className="text-[#c0392b] blood-glow">РЕФТИНСКОМ РП</span>
            </h2>
            <p className="font-body text-sm text-[#a09080] leading-relaxed mb-6">
              Тёмные улицы ждут тебя. Заходи в Discord, знакомься с правилами
              и погружайся в атмосферу настоящего ролевого мира.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-sm tracking-widest px-6 py-3 border border-[#5865F2] text-[#e0d8d0] hover:bg-[#5865F2] transition-all duration-300 flex items-center justify-center gap-2"
                style={{ boxShadow: "0 0 15px rgba(88,101,242,0.3)" }}
              >
                <Icon name="MessageCircle" size={16} />
                ВСТУПИТЬ В DISCORD
              </a>
              <button
                onClick={() => setShowWelcome(false)}
                className="font-heading text-sm tracking-widest px-6 py-3 border border-[#8B0000] text-[#e0d8d0] hover:bg-[#8B0000] transition-all duration-300"
              >
                ПОЕХАЛИ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}