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
          border-radius: 26px;
          overflow: hidden;
          background: transparent;
          box-shadow: none;
        }

        .wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 260px; /* база, далі зробимо адаптив */
          border-radius: 26px;
          overflow: hidden;

          /* 🔥 Основний фон */
          background:
            linear-gradient(145deg, #0b1228 0%, #060b1c 100%);

          /* Глибина */
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.05),
            inset 0 -20px 60px rgba(0,0,0,0.6),
            0 10px 40px rgba(0,0,0,0.6);
        }

        /* 🔵 Центральний glow */
        .wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 50% 40%,
              rgba(0, 180, 255, 0.18),
              rgba(0, 180, 255, 0.08) 30%,
              transparent 70%
            );
          pointer-events: none;
          opacity: 0.8;
        }

        /* 🌫 Верхній світловий шар */
        .wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.05),
              rgba(255,255,255,0.01) 20%,
              transparent 40%,
              rgba(0,0,0,0.4) 100%
            );
          pointer-events: none;
        }

        /* 🔲 Легка внутрішня рамка */
        .frame {
          position: absolute;
          inset: 0;
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,0.06);
          pointer-events: none;
        }

        /* 🌌 Декоративні бокові градієнти */
        .side-glow-left,
        .side-glow-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 30%;
          pointer-events: none;
        }

        .side-glow-left {
          left: 0;
          background:
            radial-gradient(
              circle at left center,
              rgba(0, 120, 255, 0.12),
              transparent 70%
            );
        }

        .side-glow-right {
          right: 0;
          background:
            radial-gradient(
              circle at right center,
              rgba(0, 180, 255, 0.12),
              transparent 70%
            );
        }
      </style>

      <ha-card>
        <div class="wrapper">
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
