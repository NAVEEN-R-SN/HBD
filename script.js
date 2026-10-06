document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SCREENS
    ========================= */

    const openingScreen =
        document.getElementById("openingScreen");

    const cakeScreen =
        document.getElementById("cakeScreen");

    const balloonScreen =
        document.getElementById("balloonScreen");

    const finalScreen =
        document.getElementById("finalScreen");

    const galleryScreen =
        document.getElementById("galleryScreen");

    /* =========================
       MAIN BUTTONS
    ========================= */

    const openSurpriseButton =
        document.getElementById("openSurpriseButton");

    const continueButton =
        document.getElementById("continueButton");

    const restartButton =
        document.getElementById("restartButton");

    const galleryButton =
        document.getElementById("galleryButton");

    const galleryBackButton =
        document.getElementById("galleryBackButton");

    /* =========================
       CAKE
    ========================= */

    const cake =
        document.getElementById("cake");

    const candle =
        document.querySelector(".candle");

    const flame =
        document.querySelector(".flame");

    const candleHint =
        document.getElementById("candleHint");

    const confettiContainer =
        document.getElementById("confettiContainer");

    /* =========================
       BALLOONS
    ========================= */

    const balloonContainer =
        document.getElementById("birthdayBalloonContainer");

    const balloonProgress =
        document.getElementById("birthdayBalloonProgress");

    const messagePopup =
        document.getElementById("birthdayMessagePopup");

    const popupEmoji =
        document.getElementById("birthdayPopupEmoji");

    const popupMessage =
        document.getElementById("birthdayPopupMessage");

    const closePopup =
        document.getElementById("birthdayClosePopup");

    const popupContinue =
        document.getElementById("birthdayPopupContinue");

    /* =========================
       GALLERY
    ========================= */

    const photoGallery =
        document.getElementById("photoGallery");

    const imageModal =
        document.getElementById("imageModal");

    const modalImage =
        document.getElementById("modalImage");

    const closeImageModal =
        document.getElementById("closeImageModal");

    /* =========================
       MUSIC
    ========================= */

    const birthdayMusic =
        document.getElementById("birthdayMusic");

    const musicButton =
        document.getElementById("musicButton");

    /* =========================
       VARIABLES
    ========================= */

    let candleReady = false;
    let poppedBalloons = 0;

    /* =========================
       BALLOON DATA
    ========================= */

    const balloonMessages = [
        {
            color: "#ff3b9d",
            emoji: "💖",
            message:
                "You have the kindest heart, and that makes you truly special."
        },
        {
            color: "#8b5cf6",
            emoji: "🌟",
            message:
                "You make every place brighter just by being there."
        },
        {
            color: "#16c9e3",
            emoji: "😊",
            message:
                "Your smile can make even an ordinary day feel beautiful."
        },
        {
            color: "#ff9f1c",
            emoji: "💪",
            message:
                "You are stronger than you realize, even on difficult days."
        },
        {
            color: "#ff4f70",
            emoji: "🌸",
            message:
                "You deserve all the happiness, love, and peace in the world."
        },
        {
            color: "#28c987",
            emoji: "🥰",
            message:
                "I am really lucky and grateful to have you in my life."
        }
    ];

    /* =========================
       PHOTO FILES
    ========================= */

    const photoFiles = [
        "memory1.jpg.jpeg",
        "memory2.jpg.jpeg",
        "memory3.jpg.jpeg",
        "memory4.jpg.jpeg",
        "memory5.jpg.jpeg",
        "memory7.jpg.jpeg",
        "memory8.jpg.jpeg",
        "memory9.jpg.jpeg",
        "memory10.jpg.jpeg",
        "memory11.jpg.jpeg",
        "memory12.jpg.jpeg",
        "memory13.jpg.jpeg",
        "memory14.jpg (2).jpeg"
    ];

    /* =========================
       SCREEN CONTROL
    ========================= */

    function showScreen(screen) {
        if (!screen) {
            return;
        }

        document.querySelectorAll(".screen").forEach(function (item) {
            item.classList.remove("active");
        });

        screen.classList.add("active");
    }

    /* =========================
       MUSIC CONTROL
    ========================= */

    function playMusic() {
        if (!birthdayMusic) {
            return;
        }

        birthdayMusic.play()
            .then(function () {
                if (musicButton) {
                    musicButton.textContent = "⏸ Pause music";
                }
            })
            .catch(function () {
                if (musicButton) {
                    musicButton.textContent = "🎵 Play music";
                }
            });
    }

    function pauseMusic() {
        if (!birthdayMusic) {
            return;
        }

        birthdayMusic.pause();

        if (musicButton) {
            musicButton.textContent = "🎵 Play music";
        }
    }

    /* =========================
       CONFETTI
    ========================= */

    function createConfetti(amount) {
        if (!confettiContainer) {
            return;
        }

        const colors = [
            "#ff4fae",
            "#ffd166",
            "#06d6a0",
            "#4cc9f0",
            "#ffffff",
            "#ff9de2"
        ];

        for (let i = 0; i < amount; i++) {
            const piece =
                document.createElement("div");

            piece.className = "confetti-piece";

            piece.style.left =
                Math.random() * 100 + "%";

            piece.style.backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];

            piece.style.animationDuration =
                Math.random() * 3 + 3 + "s";

            piece.style.animationDelay =
                Math.random() * 1.5 + "s";

            confettiContainer.appendChild(piece);

            setTimeout(function () {
                piece.remove();
            }, 7000);
        }
    }

    /* =========================
       CAKE
    ========================= */

    function startCakeAnimation() {
        if (!cake) {
            return;
        }

        cake.classList.remove("cake-start");

        if (flame) {
            flame.style.display = "block";
        }

        candleReady = false;

        void cake.offsetWidth;

        requestAnimationFrame(function () {
            cake.classList.add("cake-start");
        });

        setTimeout(function () {
            candleReady = true;
        }, 3700);
    }

    /* =========================
       BALLOONS
    ========================= */

    function createBalloons() {
        if (!balloonContainer) {
            return;
        }

        balloonContainer.innerHTML = "";

        balloonMessages.forEach(function (item, index) {
            const balloon =
                document.createElement("div");

            balloon.className =
                "birthday-balloon birthday-balloon-" +
                (index + 1);

            balloon.style.backgroundColor =
                item.color;

            balloon.style.color =
                item.color;

            balloon.innerHTML =
                "<span class='birthday-balloon-number'>" +
                (index + 1) +
                "</span>" +
                "<span class='balloon-string'></span>";

            balloon.addEventListener("click", function () {
                popBalloon(balloon, item);
            });

            balloonContainer.appendChild(balloon);
        });
    }

    function popBalloon(balloon, item) {
        if (!balloon || balloon.classList.contains("pop")) {
            return;
        }

        balloon.classList.add("pop");

        poppedBalloons++;

        if (balloonProgress) {
            balloonProgress.textContent =
                poppedBalloons +
                " of " +
                balloonMessages.length +
                " balloons popped";
        }

        if (popupEmoji) {
            popupEmoji.textContent = item.emoji;
        }

        if (popupMessage) {
            popupMessage.textContent = item.message;
        }

        if (messagePopup) {
            messagePopup.classList.remove("hidden");
        }

        createConfetti(25);

        setTimeout(function () {
            balloon.remove();
        }, 450);

        if (poppedBalloons === balloonMessages.length) {
            setTimeout(function () {
                if (messagePopup) {
                    messagePopup.classList.add("hidden");
                }

                showScreen(finalScreen);
                createConfetti(120);
            }, 1800);
        }
    }

    function openBalloonScreen() {
        poppedBalloons = 0;

        if (balloonProgress) {
            balloonProgress.textContent =
                "0 of " +
                balloonMessages.length +
                " balloons popped";
        }

        createBalloons();
        showScreen(balloonScreen);
    }

    /* =========================
       PHOTO GALLERY
    ========================= */

    function createPhotoGallery() {
        if (!photoGallery) {
            return;
        }

        photoGallery.innerHTML = "";

        photoFiles.forEach(function (filename, index) {
            const photoButton =
                document.createElement("button");

            const image =
                document.createElement("img");

            photoButton.className = "photo-card";

            photoButton.setAttribute(
                "aria-label",
                "Open memory " + (index + 1)
            );

            image.src = "image/" + filename;
            image.alt = "Birthday memory " + (index + 1);

            image.addEventListener("error", function () {
                image.alt =
                    filename + " could not be loaded";
            });

            photoButton.appendChild(image);

            photoButton.addEventListener("click", function () {
                if (!imageModal || !modalImage) {
                    return;
                }

                modalImage.src = image.src;
                modalImage.alt = image.alt;
                imageModal.classList.remove("hidden");
            });

            photoGallery.appendChild(photoButton);
        });
    }

    /* =========================
       EVENT LISTENERS
    ========================= */

    if (openSurpriseButton) {
        openSurpriseButton.addEventListener("click", function () {
            showScreen(openingScreen);
            playMusic();
        });
    }

    if (continueButton) {
        continueButton.addEventListener("click", function () {
            showScreen(cakeScreen);
            startCakeAnimation();
            createConfetti(90);
        });
    }

    if (candle) {
        candle.addEventListener("click", function () {
            if (!candleReady) {
                return;
            }

            if (flame) {
                flame.style.display = "none";
            }

            if (candleHint) {
                candleHint.textContent =
                    "Make a beautiful wish... ✨";
            }

            createConfetti(50);

            setTimeout(function () {
                if (candleHint) {
                    candleHint.textContent =
                        "Your wish is on its way 💖";
                }
            }, 1500);

            setTimeout(function () {
                openBalloonScreen();
            }, 2200);
        });
    }

    if (galleryButton) {
        galleryButton.addEventListener("click", function () {
            createPhotoGallery();
            showScreen(galleryScreen);
        });
    }

    if (galleryBackButton) {
        galleryBackButton.addEventListener("click", function () {
            showScreen(finalScreen);
        });
    }

    if (restartButton) {
        restartButton.addEventListener("click", function () {
            window.location.reload();
        });
    }

    if (musicButton) {
        musicButton.addEventListener("click", function () {
            if (!birthdayMusic) {
                return;
            }

            if (birthdayMusic.paused) {
                playMusic();
            } else {
                pauseMusic();
            }
        });
    }

    /* Balloon popup */

    if (closePopup && messagePopup) {
        closePopup.addEventListener("click", function () {
            messagePopup.classList.add("hidden");
        });
    }

    if (popupContinue && messagePopup) {
        popupContinue.addEventListener("click", function () {
            messagePopup.classList.add("hidden");
        });
    }

    if (messagePopup) {
        messagePopup.addEventListener("click", function (event) {
            if (event.target === messagePopup) {
                messagePopup.classList.add("hidden");
            }
        });
    }

    /* Image popup */

    if (closeImageModal && imageModal) {
        closeImageModal.addEventListener("click", function () {
            imageModal.classList.add("hidden");
        });
    }

    if (imageModal) {
        imageModal.addEventListener("click", function (event) {
            if (event.target === imageModal) {
                imageModal.classList.add("hidden");
            }
        });
    }

});