document.addEventListener('DOMContentLoaded', function () {
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

    const logoFadeInPopOutTime = 2500;
    const logoMoveTime = 900;

    function setViewportUnits() {
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--vw', `${vw}px`);
    }

    setViewportUnits();
    window.addEventListener('resize', setViewportUnits);

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
                        modalContent.innerHTML = '';
                        modal.classList.remove('open');
                        setTimeout(() => {
                            modal.style.display = 'none';
                            modal.style.top = '';
                            modal.style.left = '';
                            modal.style.width = '';
                            modal.style.height = '';
                        }, 300);
                    }
                }

                if (aboutUsCard) {
                    aboutUsCard.addEventListener('click', function () {
                        const modalId = this.getAttribute('data-modal');
                        openModal(modalId);
                    });
                }

                if (contactUsCard) {
                    contactUsCard.addEventListener('click', function () {
                        const modalId = this.getAttribute('data-modal');
                        openModal(modalId);
                    });
                }

                closeButtons.forEach(button => {
                    button.addEventListener('click', function () {
                        const modal = this.closest('.modal-container');
                        closeModal(modal);
                    });
                });

                // Floating Card to Modal Transition
                document.querySelectorAll('.floating-card').forEach(card => {
                    card.addEventListener('click', () => {
                        const rect = card.getBoundingClientRect();

                        modalContent.innerHTML = '';
                        modal.style.display = 'block';
                        modal.style.top = `${rect.top}px`;
                        modal.style.left = `${rect.left}px`;
                        modal.style.width = `${rect.width}px`;
                        modal.style.height = `${rect.height}px`;
                        modal.style.transform = 'none';

                        requestAnimationFrame(() => {
                            modal.classList.add('open');

                            const handleTransitionEnd = () => {
                                const title = card.getAttribute('data-title') || 'Default Title';
                                const text = card.getAttribute('data-text') || 'Default text goes here.';
                                modalContent.innerHTML = `
                                    <h2>${title}</h2>
                                    <p>${text}</p>
                                `;
                                modal.removeEventListener('transitionend', handleTransitionEnd);
                            };

                            modal.addEventListener('transitionend', handleTransitionEnd);
                            setupClickOutsideToClose();
                        });
                    });
                });

                // Modal close button
                modalCloseBtn.addEventListener('click', () => {
                    modal.classList.remove('open');

                    modal.addEventListener('transitionend', function handler() {
                        modal.style.display = 'none';
                        modalContent.innerHTML = '';
                        modal.removeEventListener('transitionend', handler);
                    }, { once: true });
                });

                // Close modal when clicking outside content
                function setupClickOutsideToClose() {
                    function outsideClickHandler(event) {
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

                    setTimeout(() => {
                        document.addEventListener('click', outsideClickHandler);
                    }, 100);
                }

            }, logoMoveTime);
        }, logoFadeInPopOutTime);
    }, 500);
});
