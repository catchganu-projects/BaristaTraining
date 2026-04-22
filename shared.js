// ── CART ──────────────────────────────────────────────────────────────
const COURSES = {
  basic: {
    id: 'basic',
    name: 'Basic Experience',
    tagline: 'Your first step behind the machine',
    level: 'Beginner',
    duration: 'Full-day — 6 hours',
    price: 199,
    color: 'stone',
    squareLink: 'https://square.link/u/AZiX4jYT',
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80',
    summary: 'A hands-on barista experience for those just starting out. Learn the fundamentals of espresso, milk texturing, and café workflow in our working Kangaroo Point café.',
    includes: [
      'Espresso machine fundamentals',
      'Milk steaming & texturing basics',
      'Grind settings & tamping technique',
      'Introduction to coffee origins & flavour',
      'Full-day hands-on session (6 hours)',
      'All coffee & materials included',
    ],
    details: `Whether you've never touched an espresso machine or just want to build real confidence, our Basic Barista Experience gives you a genuine taste of café life. You'll spend a full day at ChattyBeans working alongside our head barista, learning how great coffee is actually made.

We cover the entire workflow — from dialling in your grind to pulling your first perfect shot and steaming milk to the right temperature and texture. By the end of the day you'll be able to produce a consistent, quality cup that you'll be genuinely proud of.

This isn't a lecture — it's hands-on from the first minute. Everything takes place in our real working café, using the same commercial equipment we use every day for our customers.`,
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced Experience',
    tagline: 'Sharpen your craft, wow every customer',
    level: 'Intermediate',
    duration: 'Two-day intensive — 12 hours',
    price: 299,
    color: 'green',
    squareLink: 'https://square.link/u/AZiX4jYT',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
    summary: 'Take your skills to the next level with advanced espresso techniques, latte art, and multiple brew methods. Ideal for those ready to go from good to exceptional.',
    includes: [
      'Advanced espresso dialling & brew ratios',
      'Latte art fundamentals — hearts & tulips',
      'Brew methods: pour-over & cold brew',
      'Café workflow & customer experience',
      'Two-day intensive (12 hours total)',
      'All coffee & materials included',
    ],
    details: `Ready to go beyond the basics? Our Advanced Barista Experience is a two-day deep dive into the craft of specialty coffee. You'll work on the finer details that separate a good barista from a great one — understanding extraction variables, dialling in espresso by taste, and producing beautiful, consistent milk textures.

Day one focuses on espresso mastery: understanding brew ratios, recognising under and over-extraction by taste, and how to adjust on the fly. Day two introduces latte art — starting with the heart and tulip — and alternative brew methods including pour-over and cold brew.

This experience is ideal for home enthusiasts who want to level up, hospitality workers building their skills, or anyone who left the Basic Experience hungry for more.`,
  },
  premium: {
    id: 'premium',
    name: 'Premium Experience',
    tagline: 'The complete ChattyBeans journey',
    level: 'Expert',
    duration: 'Three-day masterclass — 20 hours',
    price: 399,
    color: 'black',
    squareLink: 'https://square.link/u/AZiX4jYT',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    summary: 'Our flagship three-day experience covering everything from foundational skills to advanced latte art, roasting theory, and one-on-one mentoring.',
    includes: [
      'Everything in Basic & Advanced',
      'Advanced latte art — rosettas & swans',
      'Coffee roasting theory & cupping session',
      'One-on-one mentoring with head barista',
      'Three-day masterclass (20 hours total)',
      'Completion certificate & all materials',
    ],
    details: `The Premium Barista Experience is the ultimate coffee journey at ChattyBeans. Over three immersive days you'll go from foundational skills all the way through to advanced latte art, roasting theory, and a personal mentoring session with our head barista.

Days one and two cover everything in our Basic and Advanced experiences, giving you a comprehensive grounding in espresso, milk, and alternative brew methods. Day three takes you further — into the world of coffee roasting and cupping, advanced poured art including rosettas and swans, and a dedicated one-on-one session where our head barista focuses entirely on your specific technique and goals.

You'll finish with a ChattyBeans Completion Certificate recognising your dedication and skill — a meaningful credential for anyone serious about coffee.`,
  },
  teens: {
    id: 'teens',
    name: 'Teens Experience',
    tagline: 'Coffee craft for the next generation',
    level: 'Ages 14–17',
    duration: 'Half-day — 3 hours',
    price: 99,
    color: 'amber',
    squareLink: 'https://square.link/u/AZiX4jYT',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
    summary: 'A fun, safe, and specially designed barista experience for teens aged 14–17. Learn the art of coffee in a supportive environment — no experience needed.',
    includes: [
      'Introduction to espresso & coffee basics',
      'Supervised hands-on machine time',
      'Milk steaming & simple latte art',
      'Coffee origins & tasting session',
      'Half-day session (3 hours)',
      'Parent/guardian welcome to attend',
    ],
    details: `Our Teens Barista Experience is a specially designed, age-appropriate introduction to the world of coffee — perfect for curious young people aged 14 to 17 who want to learn a real-world skill in a fun environment.

The session is relaxed, supportive, and tailored to younger participants. Our head barista guides teens through the basics of espresso, explains where coffee comes from and how it's processed, and gives everyone hands-on time on the machine with close supervision.

By the end of the session, every participant will have pulled their own espresso shot, steamed milk, and attempted their first latte art pour. Parents and guardians are warmly welcome to attend and watch — or even join in!

No caffeine overload here — we keep tastings sensible and we also cater for non-coffee participants who'd prefer to explore alternative brew methods and milk-based drinks.`,
  },
};

function getCart() {
  try { return JSON.parse(localStorage.getItem('cb_cart') || '{}'); } catch { return {}; }
}
function saveCart(cart) {
  localStorage.setItem('cb_cart', JSON.stringify(cart));
}
function addToCart(id, date) {
  const cart = getCart();
  cart[id] = { ...COURSES[id], selectedDate: date || null };
  saveCart(cart);
  updateCartUI();
}
function removeFromCart(id) {
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
  updateCartUI();
}
function cartTotal() {
  const cart = getCart();
  return Object.values(cart).reduce((s, c) => s + c.price, 0);
}
function cartCount() {
  return Object.keys(getCart()).length;
}
function updateCartUI() {
  const count = cartCount();
  const total = cartTotal();
  const bar = document.getElementById('cartBar');
  const countEl = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotalBar');
  if (bar) bar.classList.toggle('visible', count > 0);
  if (countEl) countEl.textContent = count;
  if (totalEl) totalEl.textContent = '$' + total;
  // Update add buttons
  Object.keys(COURSES).forEach(id => {
    const btn = document.getElementById('btn-' + id);
    if (!btn) return;
    const inCart = !!getCart()[id];
    btn.textContent = inCart ? '✓ Added' : (btn.dataset.label || 'Add to cart');
    btn.classList.toggle('added', inCart);
    btn.disabled = inCart;
  });
}

// ── CALENDAR ──────────────────────────────────────────────────────────
// Available slots — edit these dates to manage your calendar
// Format: 'YYYY-MM-DD': ['courseid', 'courseid', ...]
const AVAILABLE_SLOTS = {
  // Apr 2026
  '2026-04-27': ['basic','premium', 'advanced'],
  '2026-04-25': ['teens'],
  // May 2026
  '2026-05-02': ['teens'],
  '2026-05-09': ['teens'],
  '2026-05-16': ['teens'],
  '2026-05-23': ['teens'],
  '2026-05-30': ['teens'],
  '2026-05-04': ['basic','premium', 'advanced'],
  '2026-05-11': ['basic','premium', 'advanced'],
  '2026-05-18': ['basic','premium', 'advanced'],
  '2026-05-25': ['basic','premium', 'advanced'],
  // July 2025
  '2025-07-05': ['teens', 'basic'],
  '2025-07-12': ['premium'],
  '2025-07-19': ['basic', 'advanced', 'teens'],
  '2025-07-26': ['basic'],
};

// To add/remove dates: edit the AVAILABLE_SLOTS object above.
// Each key is a date string YYYY-MM-DD, value is an array of course IDs available that day.
