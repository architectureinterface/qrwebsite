
document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.getElementById('loading-container');
    const loadingImage = document.getElementById('loading-image');
    const loadingLogo = document.getElementById('loading-logo');
    const mainHeader = document.querySelector('header');
    const mainContent = document.getElementById('main-content');
    const floatingCardsContainer = document.querySelector('.floating-cards-container');
    const closeButtons = document.querySelectorAll('.close-button');
    const modalContainers = document.querySelectorAll('.modal-container');

    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal-view');
    const modalContent = modal.querySelector('.modal-content');
    const modalCloseBtn = modal.querySelector('.close-button');

    const logoFadeInPopOutTime = 1600;
    const logoMoveTime = 1600;

    function setVh() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      window.addEventListener('resize', setVh);
      setVh();
      

    setTimeout(() => {
        loadingLogo.classList.add('visible');

        setTimeout(() => {
            loadingLogo.classList.add('moved');

            setTimeout(() => {
                loadingContainer.classList.add('loaded');
                loadingImage.classList.add('loaded');
                mainContent.classList.add('visible');
                floatingCardsContainer.classList.add('visible');
                document.body.style.overflow = 'auto';

                setTimeout(() => {
                    loadingImage.remove();
                    loadingContainer.remove();
                }, 2000);

                const aboutUsCard = document.querySelector('.about-us-card');
                const contactUsCard = document.querySelector('.contact-us-card');

                // OPEN MODAL BY ID
                function openModal(modalId) {
                    const modal = document.getElementById(modalId);
                    if (modal) {
                        modal.style.display = 'flex';
                    } else {
                        console.error(`Modal with ID '${modalId}' not found!`);
                    }
                }

                // CLOSE MODAL CONTAINER
                function closeModal(modal) {
                    if (modal) {
                        modal.style.display = 'none';
                    }
                }

                if (aboutUsCard) {
                    aboutUsCard.addEventListener('click', function() {
                        const modalId = this.getAttribute('data-modal');
                        openModal(modalId);
                    });
                }

                if (contactUsCard) {
                    contactUsCard.addEventListener('click', function() {
                        const modalId = this.getAttribute('data-modal');
                        openModal(modalId);
                    });
                }

                closeButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const modal = this.closest('.modal-container');
                        closeModal(modal);
                    });
                });

                // Floating Card -> Modal Transition
                 // Floating Card Click
                 document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('click', () => {
      const rect = card.getBoundingClientRect();

      // Set initial position & size to match clicked card
      modal.style.display = 'block';
      modal.style.top = `${rect.top}px`;
      modal.style.left = `${rect.left}px`;
      modal.style.width = `${rect.width}px`;
      modal.style.height = `${rect.height}px`;
      modal.style.transform = 'none';

      // Force next frame before transitioning
      requestAnimationFrame(() => {
  modal.classList.add('open');
  modalContent.innerHTML = `
    <h2>Expanded Card</h2>
    <p>This is dummy content replacing the card's original text. Add anything here to simulate expanded view.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien vel nisi convallis commodo.</p>
  `;
  setupClickOutsideToClose(); // 🔥 Attach outside click listener safely
});
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    modal.classList.remove('open');

    // Hide modal and clear content after animation
    modal.addEventListener('transitionend', function handler() {
      modal.style.display = 'none';
      modalContent.innerHTML = '';
      modal.removeEventListener('transitionend', handler);
    }, { once: true });
  });

  // Click outside modal-content to close modal
function setupClickOutsideToClose() {
    function outsideClickHandler(event) {
        // If the modal is open and click is outside the content
        if (
            modal.style.display === 'block' &&
            modal.classList.contains('open') &&
            !modalContent.contains(event.target)
        ) {
            modal.classList.remove('open');
            modal.addEventListener('transitionend', function handler() {
                modal.style.display = 'none';
                modalContent.innerHTML = '';
                document.removeEventListener('click', outsideClickHandler);
                modal.removeEventListener('transitionend', handler);
            }, { once: true });
        }
    }

    // Click outside modal-content to close modal
function setupClickOutsideToClose() {
    function outsideClickHandler(event) {
        // If the modal is open and click is outside the content
        if (
            modal.style.display === 'block' &&
            modal.classList.contains('open') &&
            !modalContent.contains(event.target)
        ) {
            modal.classList.remove('open');
            modal.addEventListener('transitionend', function handler() {
                modal.style.display = 'none';
                modalContent.innerHTML = '';
                document.removeEventListener('click', outsideClickHandler);
                modal.removeEventListener('transitionend', handler);
            }, { once: true });
        }
    }

    // Add listener slightly delayed to avoid conflicting with initial card click
    setTimeout(() => {
        document.addEventListener('click', outsideClickHandler);
    }, 100);
}


    // Add listener slightly delayed to avoid conflicting with initial card click
    setTimeout(() => {
        document.addEventListener('click', outsideClickHandler);
    }, 100);
}



            }, logoMoveTime);
        }, logoFadeInPopOutTime);
    }, 500);
});