// Gallery: render projects, filter, lightbox with arrows
document.addEventListener('DOMContentLoaded', function() {
  const grid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');

  let currentProject = null;
  let currentIndex = 0;

  // Render gallery grid from galleryProjects
  function renderGrid() {
    grid.innerHTML = galleryProjects.map(project => {
      const subtitle =
        project.category && project.category !== project.name
          ? `<span>${project.category}</span>`
          : '';
      return `
      <div class="gallery-item" data-category="${project.category}">
        <div class="gallery-item-inner" data-project-id="${project.id}">
          <div class="gallery-item-img" style="background-image: url('${project.featured}');"></div>
          <div class="gallery-item-overlay">
            <h3>${project.name}</h3>
            ${subtitle}
          </div>
        </div>
      </div>`;
    }).join('');
  }

  renderGrid();

  // Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Open lightbox
  function openLightbox(projectId) {
    const project = galleryProjects.find(p => p.id === projectId);
    if (!project || !project.images.length) return;

    currentProject = project;
    currentIndex = 0;

    lightboxImg.src = project.images[0];
    lightboxImg.alt = project.name;
    lightboxTitle.textContent = project.name;
    updateCounter();

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateCounter() {
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentProject.images.length}`;
  }

  function showImage(index) {
    if (!currentProject) return;
    currentIndex = ((index % currentProject.images.length) + currentProject.images.length) % currentProject.images.length;
    lightboxImg.src = currentProject.images[currentIndex];
    updateCounter();
  }

  // Click on tile to open lightbox
  grid.addEventListener('click', function(e) {
    const inner = e.target.closest('.gallery-item-inner');
    if (!inner) return;
    const projectId = inner.getAttribute('data-project-id');
    openLightbox(projectId);
  });

  // Close button
  lightboxClose.addEventListener('click', closeLightbox);

  // Click backdrop to close
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Arrows
  lightboxPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  lightboxNext.addEventListener('click', function(e) {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
});
