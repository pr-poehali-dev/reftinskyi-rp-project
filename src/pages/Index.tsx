import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d2cbd6c5-ea14-4224-82f7-a50b311f182d/files/6bbfbc69-c0ce-4668-a5d3-9cd8b5ad20f4.jpg";

const updates = [
  {
    date: "24 апр 2026",
    tag: "ИВЕНТ",
    title: "Апокалипсис наступает",
    desc: "Зона поражения расширяется на восток. Новые мутанты, новые угрозы. Выживших единицы.",
    icon: "Flame",
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

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              ["#about", "О СЕРВЕРЕ"],
              ["#updates", "ОБНОВЛЕНИЯ"],
              ["#creators", "СОЗДАТЕЛИ"],
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
          <a
            href="#"
            className="font-heading text-sm tracking-widest px-5 py-2 text-[#e0d8d0] border border-[#8B0000] hover:bg-[#8B0000] transition-all duration-300"
            style={{ boxShadow: "0 0 10px rgba(139,0,0,0.3)" }}
          >
            ИГРАТЬ
          </a>
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

      {/* UPDATES */}
      <section id="updates" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="mb-14 flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-3">02 / ХРОНИКА</div>
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
              <div className="font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-3">03 / КОМАНДА</div>
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-[#e8e0d8] leading-tight">
                СОЗДАТЕЛИ<br />
                <span className="text-[#c0392b]">МИРА</span>
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
                  <div
                    className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center font-heading text-3xl text-[#e0d8d0] font-bold"
                    style={{
                      background: `radial-gradient(circle, ${c.color}99 0%, ${c.color}44 100%)`,
                      border: `1px solid ${c.color}88`,
                      boxShadow: `0 0 30px ${c.color}66`,
                    }}
                  >
                    {c.initials}
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

      {/* RULES */}
      <section id="rules" className="py-24 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(139,0,0,0.06) 0%, transparent 50%)" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeSection>
            <div className="mb-14 text-center">
              <div className="font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-3">04 / ЗАКОН</div>
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
              <div className="font-heading text-xs tracking-[0.4em] text-[#8B0000] mb-3">05 / ВОПРОСЫ</div>
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
              { icon: "MessageCircle", label: "Discord" },
              { icon: "Send", label: "Telegram" },
              { icon: "Monitor", label: "VK" },
            ].map(({ icon, label }) => (
              <a
                key={label}
                href="#"
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
    </div>
  );
}