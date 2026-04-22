// Course detail page shared renderer
function renderDetailPage(courseId) {
  const course = COURSES[courseId];
  if (!course) { window.location.href = 'index.html'; return; }

  document.title = `${course.name} — ChattyBeans`;

  const colorMap = {
    stone: { bg: '#F2F0EB', tag: 'rgba(10,10,8,0.07)', tagText: '#7A7A72', headerText: '#0A0A08' },
    green: { bg: '#1A3A2A', tag: 'rgba(200,169,110,0.2)', tagText: '#C8A96E', headerText: '#FAFAF7' },
    black: { bg: '#0A0A08', tag: 'rgba(200,169,110,0.15)', tagText: '#C8A96E', headerText: '#FAFAF7' },
    amber: { bg: '#FDF3E3', tag: 'rgba(146,96,10,0.1)', tagText: '#92600A', headerText: '#0A0A08' },
  };
  const col = colorMap[course.color] || colorMap.stone;

  document.getElementById('course-header').style.background = col.bg;
  document.getElementById('course-level-tag').style.background = col.tag;
  document.getElementById('course-level-tag').style.color = col.tagText;
  document.getElementById('course-level-tag').textContent = course.level;
  document.getElementById('course-name').style.color = col.headerText;
  document.getElementById('course-name').textContent = course.name;
  document.getElementById('course-tagline').style.color = col.headerText === '#0A0A08' ? '#7A7A72' : 'rgba(250,250,247,0.6)';
  document.getElementById('course-tagline').textContent = course.tagline;
  document.getElementById('course-price').textContent = '$' + course.price;
  document.getElementById('course-duration-tag').textContent = course.duration;
  document.getElementById('course-summary').textContent = course.summary;
  document.getElementById('course-details-text').innerHTML = course.details.split('\n\n').map(p => `<p>${p}</p>`).join('');
  document.getElementById('course-hero-img').src = course.image;
  document.getElementById('course-hero-img').alt = course.name;

  const incList = document.getElementById('course-includes');
  incList.innerHTML = course.includes.map(i => `
    <li>
      <span class="feat-dot"></span>
      <span>${i}</span>
    </li>`).join('');

  // Add to cart button
  const cartBtn = document.getElementById('detail-cart-btn');
  const inCart = !!getCart()[courseId];
  cartBtn.textContent = inCart ? '✓ Added to cart' : 'Add to cart — $' + course.price;
  cartBtn.classList.toggle('added', inCart);
  cartBtn.disabled = inCart;
  cartBtn.onclick = () => {
    addToCart(courseId);
    cartBtn.textContent = '✓ Added to cart';
    cartBtn.classList.add('added');
    cartBtn.disabled = true;
  };

  updateCartUI();
}

function renderModal() {
  const cart = getCart();
  const keys = Object.keys(cart);
  const total = keys.reduce((s, k) => s + cart[k].price, 0);
  document.getElementById('cartItems').innerHTML = keys.length === 0
    ? '<div class="empty-msg">Nothing selected yet.</div>'
    : keys.map(k => `
        <div class="cart-item">
          <div>
            <div class="cart-item-name">${cart[k].name}</div>
            <div class="cart-item-sub">${cart[k].duration}</div>
          </div>
          <div class="cart-item-right">
            <span class="cart-item-price">$${cart[k].price}</span>
            <button class="remove-item" onclick="removeFromCart('${k}');renderModal();">✕</button>
          </div>
        </div>`).join('');
  document.getElementById('modalTotal').textContent = '$' + total;
}
function openModal()  { renderModal(); document.getElementById('overlay').classList.add('open'); }
function closeModal() { document.getElementById('overlay').classList.remove('open'); }
function closeOnOverlay(e) { if (e.target === document.getElementById('overlay')) closeModal(); }
function checkout() {
  const keys = Object.keys(getCart());
  if (!keys.length) return;
  if (keys.length === 1) { window.location.href = COURSES[keys[0]].squareLink; }
  else { keys.forEach(id => window.open(COURSES[id].squareLink, '_blank')); }
}
