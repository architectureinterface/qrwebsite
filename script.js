document.addEventListener('DOMContentLoaded', function () {
    const loadingContainer = document.getElementById('loading-container');
    const loadingImage = document.getElementById('loading-image');
    const loadingLogo = document.getElementById('loading-logo');
    const mainContent = document.getElementById('main-content');
    const floatingCardsContainer = document.querySelector('.floating-cards-container');

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
    window.addEventListener('orientationchange', setViewportUnits);

    // Main loading animation
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

                // OPEN MODAL
                function openModal({ title = 'Default Title', text = 'Default text goes here.', sourceRect = null, isContactUs = false }) {
                    modalContent.innerHTML = '';
                    modal.style.display = 'block';
                
                    if (sourceRect) {
                        modal.style.top = `${sourceRect.top}px`;
                        modal.style.left = `${sourceRect.left}px`;
                        modal.style.width = `${sourceRect.width}px`;
                        modal.style.height = `${sourceRect.height}px`;
                    }
                
                    requestAnimationFrame(() => {
                        modal.classList.add('open');
                        document.body.classList.add('modal-open');
                
                        modal.addEventListener('transitionend', function handler() {
                            // Inject content *after* modal opens
                            if (title=='Contact Us') {
                                modalContent.innerHTML = `
                                      <h2 style="text-align: center;">Contact Us</h2>
                                      <p>Email: <a href="mailto:studio@architectureinterface.in">studio@architectureinterface.in</a></p>
                                      <p>Mobile: <a href="tel:+918848152173">+91 8848 152 173</a></p>
                                    <div class="map-preview">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.6260937735015!2d76.30293067360313!3d9.965034073638318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0873c3746e238d%3A0x5fcbca090798b116!2sarchitecture%20interface!5e0!3m2!1sen!2sin!4v1746340238604!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                        <p class="map-address">
    Architecture Interface<br>
    55-3355 E, Ravindran Rd, Elamkulam,<br>
    Kochi, Ernakulam,<br>
    Kerala 682020
</p>
                                `;
                            } else {
                                modalContent.innerHTML = `
                                    <h2>${title}</h2>
                                    <p>${text}</p>
                                `;
                            }
                
                            modal.removeEventListener('transitionend', handler);
                        }, { once: true });
                    });
                }
                

                // CLOSE MODAL
                function closeModal() {
                    if (!modal.classList.contains('open')) return;

                    modalContent.innerHTML = '';
                    modal.classList.remove('open');
                    document.body.classList.remove('modal-open');

                    modal.addEventListener('transitionend', function handler() {
                        modal.style.display = 'none';
                        modal.style.top = '';
                        modal.style.left = '';
                        modal.style.width = '';
                        modal.style.height = '';
                        modal.removeEventListener('transitionend', handler);
                    }, { once: true });
                }

                // Click inside floating cards container (delegated)
                document.body.addEventListener('click', function (event) {
                    const target = event.target;

                    // Handle floating card click
                    const floatingCard = target.closest('.floating-card');
                    if (floatingCard) {
                        const rect = floatingCard.getBoundingClientRect();
                        const title = floatingCard.getAttribute('data-title');
                        const text = floatingCard.getAttribute('data-text');
                        openModal({ title, text, sourceRect: rect });
                        return;
                    }

                    

                    // Handle outside modal click to close
                    if (
                        modal.style.display === 'block' &&
                        modal.classList.contains('open') &&
                        !modalContent.contains(target) &&
                        target !== modalCloseBtn
                    ) {
                        closeModal();
                    }
                });

            }, logoMoveTime);
        }, logoFadeInPopOutTime);
    }, 500);
});
