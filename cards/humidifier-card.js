class HumidifierCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        ha-card {
          padding: 0;
          border-radius: 28px;
          overflow: hidden;
          background: transparent;
          box-shadow: none;
        }

        .wrapper {
          position: relative;
          width: 100%;
          min-height: 260px;
          border-radius: 28px;
          overflow: hidden;
          background: #0a0a0a;
        }

        /* 🔥 ВЕРХ — ГЛЯНЦЕВЕ СКЛО */
        .top {
          position: absolute;
          inset: 0;
          height: 60%;
          background:
            linear-gradient(
              to bottom,
              #0a0a0a 0%,
              #050505 40%,
              #000000 100%
            );
        }

        /* ✨ глянець */
        .top::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.18) 0%,
              rgba(255,255,255,0.06) 20%,
              transparent 45%
            );
          pointer-events: none;
        }

        /* 🔵 легкий холодний glow */
        .top::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 50% 60%,
              rgba(0, 160, 255, 0.12),
              transparent 70%
            );
          pointer-events: none;
        }

        /* 🔻 НИЗ — МАТОВИЙ ПЛАСТИК */
        .bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background:
            linear-gradient(
              to bottom,
              #2a2a2a 0%,
              #1e1e1e 40%,
              #141414 100%
            );
        }

        /* 🌫 матова текстура */
        .bottom::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255,255,255,0.06),
              transparent 60%
            );
          pointer-events: none;
        }

        /* 🔘 зона переходу (під дугу) */
        .divider {
          position: absolute;
          left: 0;
          right: 0;
          top: 55%;
          height: 80px;
          transform: translateY(-50%);
          pointer-events: none;

          background:
            radial-gradient(
              ellipse at center,
              rgba(0,0,0,0.8) 0%,
              rgba(0,0,0,0.6) 40%,
              transparent 70%
            );
        }

        /* 🪟 внутрішня рамка */
        .frame {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.06);
          pointer-events: none;
        }

        /* 🌌 бокове підсвічування */
        .side-glow-left,
        .side-glow-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 25%;
          pointer-events: none;
        }

        .side-glow-left {
          left: 0;
          background:
            radial-gradient(
              circle at left center,
              rgba(0, 140, 255, 0.08),
              transparent 70%
            );
        }

        .side-glow-right {
          right: 0;
          background:
            radial-gradient(
              circle at right center,
              rgba(0, 180, 255, 0.08),
              transparent 70%
            );
        }
      </style>

      <ha-card>
        <div class="wrapper">
          <div class="top"></div>
          <div class="bottom"></div>
          <div class="divider"></div>
          <div class="side-glow-left"></div>
          <div class="side-glow-right"></div>
          <div class="frame"></div>
        </div>
      </ha-card>
    `;
  }
}

if (!customElements.get('humidifier-card')) {
  customElements.define('humidifier-card', HumidifierCard);
}
