document.addEventListener('DOMContentLoaded', function () {
    // =================== CARROSSEL DOS CARDS ===================
    document.querySelectorAll('.carrossel .item').forEach(function (card) {
      // Clique no card (abre/fecha)
      card.addEventListener('click', function () {
        document.querySelectorAll('.carrossel .item').forEach(function (c) {
          if (c !== card) c.classList.remove('active');
        });
        card.classList.toggle('active');
      });
  
      // Carrossel interno
      const slides = card.querySelector('.card-slides');
      if (!slides) return;
  
      const images = slides.querySelectorAll('img');
      const prevBtn = card.querySelector('.card-prev');
      const nextBtn = card.querySelector('.card-next');
      const pagContainer = card.querySelector('.card-paginacao');
  
      // Gerar bolinhas de paginação dinamicamente
      pagContainer.innerHTML = '';
      images.forEach(() => {
        const span = document.createElement('span');
        pagContainer.appendChild(span);
      });
      const pag = pagContainer.querySelectorAll('span');
  
      let index = 0;
  
      function showSlide(i) {
        index = (i + images.length) % images.length;
        slides.style.transform = `translateX(-${index * 100}%)`;
        pag.forEach((btn, idx) => btn.classList.toggle('active', idx === index));
      }
  
      // Clique nos pontos da paginação
      pag.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          showSlide(idx);
        });
      });
  
      // Setas
      if (prevBtn)
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          showSlide(index - 1);
        });
  
      if (nextBtn)
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          showSlide(index + 1);
        });
  
      showSlide(0); // Inicia sempre no primeiro
    });
  
    // =================== MODAL DE IMAGENS ===================
    let modalImgs = [];
    let modalIndex = 0;
  
    const modal = document.getElementById('modal-img');
    const modalImg = document.getElementById('img-modal-full');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const modalClose = document.querySelector('.close-modal');
  
    // Abrir modal ao clicar na imagem do card
    document.querySelectorAll('.card-img').forEach(function (img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function (e) {
        e.stopPropagation();
        const slides = img.closest('.card-slides');
        modalImgs = Array.from(slides.querySelectorAll('.card-img')).map(
          (el) => el.src
        );
        modalIndex = modalImgs.indexOf(img.src);
        openModalWithIndex(modalIndex);
      });
    });
  
    function openModalWithIndex(idx) {
      if (!modalImgs.length) return;
      modalImg.src = modalImgs[idx];
      modal.classList.add('active');
      showHideModalArrows();
    }
  
    function showHideModalArrows() {
      if (!modalPrev || !modalNext) return;
      const showArrows = modalImgs.length > 1;
      modalPrev.style.display = showArrows ? 'block' : 'none';
      modalNext.style.display = showArrows ? 'block' : 'none';
    }
  
    // Navegação pelas setas do modal
    if (modalPrev) {
      modalPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        modalIndex = (modalIndex - 1 + modalImgs.length) % modalImgs.length;
        openModalWithIndex(modalIndex);
      });
    }
  
    if (modalNext) {
      modalNext.addEventListener('click', function (e) {
        e.stopPropagation();
        modalIndex = (modalIndex + 1) % modalImgs.length;
        openModalWithIndex(modalIndex);
      });
    }
  
    // Fecha no X
    if (modalClose) {
      modalClose.addEventListener('click', function () {
        modal.classList.remove('active');
      });
    }
  
    // Fecha clicando fora da imagem
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === this) this.classList.remove('active');
      });
    }
  
    /* ============================================================
       3) FORMULÁRIO WHATSAPP
    ============================================================ */
    const form = document.getElementById("formulario");

    function enviarWhats(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        if (!nome || !mensagem) {
            alert("Preencha seu nome e a mensagem!");
            return;
        }

        const telefone = "5511948228843";
        const texto = `Olá, meu nome é ${nome}, ${mensagem}`;
        const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(texto)}`;

        window.open(url, "_blank");
    }

    if (form) form.addEventListener("submit", enviarWhats);


    /* ============================================================
       4) SCROLLER DE SKILLS / TAGS
    ============================================================ */
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", "true");

            const inner = scroller.querySelector(".tags-img");
            const items = [...inner.children];

            items.forEach((item) => {
                const clone = item.cloneNode(true);
                clone.setAttribute("aria-hidden", "true");
                inner.appendChild(clone);
            });
        });
    }


    /* ============================================================
       5) ANIMAÇÃO DA BARRA LATERAL DE SKILLS (HUD)
    ============================================================ */
    const sidebar = document.querySelector(".skills-sidebar");
    const sobre = document.querySelector(".sobre");

    if (sidebar && sobre) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        sidebar.classList.add("visible");
                    } else {
                        sidebar.classList.remove("visible");
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(sobre);
    }

});