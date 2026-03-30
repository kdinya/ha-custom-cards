class HumidifierCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
  }

  setConfig(config) {
    this._config = {
      aspect_ratio: '2 / 1',
      min_height: 260,
      max_height: 420,
      radius: 28,

      // Верхня "скляна" частина
      glass_tint: 'rgba(24, 34, 46, 0.24)',

      // Нижня "пластикова" частина
      plastic_top: '#7f8893',
      plastic_mid: '#606972',
      plastic_bottom: '#4e565f',

      // Межа між верхом і низом
      split_y: 58,          // % від висоти картки
      arc_rise: 14,         // наскільки дуга підіймається в центрі, % від висоти картки
      edge_fade: 10,        // м'якість стику зверху, px

      ...config,
    };

    this._render();
  }

  getCardSize() {
    return 4;
  }

  _render() {
    const c = this._config;
    const splitY = Number(c.split_y);
    const arcRise = Number(c.arc_rise);

    // Уніфікований clip-path для нижньої пластикової секції
    // Ліва/права точки на splitY, центр дуги піднятий на arcRise
    const plasticClip = `polygon(
      0% ${splitY}%,
      10% ${splitY - 1}%,
      20% ${splitY - 3}%,
      30% ${splitY - 6}%,
      40% ${splitY - 10}%,
      50% ${splitY - arcRise}%,
      60% ${splitY - 10}%,
      70% ${splitY - 6}%,
      80% ${splitY - 3}%,
      90% ${splitY - 1}%,
      100% ${splitY}%,
      100% 100%,
      0% 100%
    )`;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --hc-radius: ${c.radius}px;
          --hc-min-height: ${c.min_height}px;
          --hc-max-height: ${c.max_height}px;
          --hc-aspect-ratio: ${c.aspect_ratio};

          --hc-glass-tint: ${c.glass_tint};

          --hc-plastic-top: ${c.plastic_top};
          --hc-plastic-mid: ${c.plastic_mid};
          --hc-plastic-bottom: ${c.plastic_bottom};

          --hc-edge-fade: ${c.edge_fade}px;
        }

        * {
          box-sizing: border-box;
        }

        ha-card {
          display: block;
          padding: 0;
          overflow: hidden;
          border-radius: var(--hc-radius);
          background: transparent;
          border: none;
          box-shadow: none;
        }

        .panel {
          position: relative;
          width: 100%;
          aspect-ratio: var(--hc-aspect-ratio);
          min-height: var(--hc-min-height);
          max-height: var(--hc-max-height);
          overflow: hidden;
          border-radius: var(--hc-radius);

          background:
            linear-gradient(180deg, #0a0c0f 0%, #090b0e 16%, #0b1118 42%, #11161d 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.07),
            inset 0 -24px 46px rgba(0,0,0,0.42),
            0 14px 34px rgba(0,0,0,0.45);
        }

        /* Зовнішня рамка */
        .panel::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015) 24%, rgba(0,0,0,0.08) 100%);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.055),
            inset 0 18px 28px rgba(255,255,255,0.015),
            inset 0 -30px 40px rgba(0,0,0,0.20);
          z-index: 20;
        }

        /* Внутрішня тонка кромка */
        .frame {
          position: absolute;
          inset: 8px;
          border-radius: calc(var(--hc-radius) - 8px);
          pointer-events: none;
          z-index: 19;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.06),
            inset 0 0 0 1px rgba(255,255,255,0.035),
            inset 0 -10px 18px rgba(0,0,0,0.12);
        }

        /* Верхня глянцева скляна частина */
        .glass {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          z-index: 1;
          overflow: hidden;
          background:
            linear-gradient(
              180deg,
              rgba(20, 21, 24, 0.95) 0%,
              rgba(12, 14, 17, 0.96) 20%,
              rgba(7, 8, 10, 0.98) 42%,
              rgba(8, 11, 15, 1) 100%
            );
        }

        /* Основний скляний відблиск зверху */
        .glass::before {
          content: "";
          position: absolute;
          left: 4%;
          right: 4%;
          top: 2.5%;
          height: 33%;
          border-radius: 0 0 34px 34px;
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.22) 0%,
              rgba(255,255,255,0.11) 16%,
              rgba(255,255,255,0.03) 44%,
              rgba(255,255,255,0) 100%
            );
          filter: blur(0.2px);
          opacity: 0.95;
        }

        /* Косий м'який відблиск */
        .glass::after {
          content: "";
          position: absolute;
          width: 62%;
          height: 38%;
          top: 6%;
          left: -8%;
          transform: rotate(-8deg);
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse at center,
              rgba(255,255,255,0.10) 0%,
              rgba(255,255,255,0.04) 34%,
              rgba(255,255,255,0.0) 72%
            );
          filter: blur(10px);
          opacity: 0.9;
        }

        .glass-tint {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          z-index: 2;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 44%, rgba(95, 145, 185, 0.10), transparent 28%),
            linear-gradient(180deg, transparent 0%, transparent 48%, rgba(0,0,0,0.16) 100%),
            linear-gradient(180deg, var(--hc-glass-tint), transparent 44%);
          mix-blend-mode: screen;
          opacity: 0.9;
        }

        /* Нижня сіра матова пластикова частина */
        .plastic {
          position: absolute;
          inset: 0;
          z-index: 5;
          clip-path: ${plasticClip};
          background:
            linear-gradient(
              180deg,
              var(--hc-plastic-top) 0%,
              var(--hc-plastic-mid) 42%,
              var(--hc-plastic-bottom) 100%
            );
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.16),
            inset 0 14px 18px rgba(255,255,255,0.04),
            inset 0 -18px 24px rgba(0,0,0,0.18);
        }

        /* Матовий шум / текстура пластику */
        .plastic-noise {
          position: absolute;
          inset: 0;
          z-index: 6;
          clip-path: ${plasticClip};
          pointer-events: none;
          opacity: 0.28;
          background:
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.028) 0px,
              rgba(255,255,255,0.028) 1px,
              rgba(0,0,0,0.02) 2px,
              rgba(0,0,0,0.02) 3px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.012) 0px,
              rgba(255,255,255,0.012) 1px,
              rgba(0,0,0,0.015) 2px,
              rgba(0,0,0,0.015) 4px
            );
          mix-blend-mode: soft-light;
        }

        /* М'яке підсвічування верхнього краю пластика */
        .plastic-highlight {
          position: absolute;
          inset: 0;
          z-index: 7;
          clip-path: ${plasticClip};
          pointer-events: none;
          background:
            radial-gradient(
              ellipse at 50% ${splitY - arcRise + 3}%,
              rgba(255,255,255,0.18) 0%,
              rgba(255,255,255,0.08) 16%,
              rgba(255,255,255,0.0) 44%
            );
          opacity: 0.65;
        }

        /* Тінь стику між склом і пластиком */
        .split-shadow {
          position: absolute;
          inset: 0;
          z-index: 8;
          pointer-events: none;
          background:
            radial-gradient(
              ellipse at 50% ${splitY - arcRise + 1}%,
              rgba(0,0,0,0.34) 0%,
              rgba(0,0,0,0.18) 12%,
              rgba(0,0,0,0.0) 24%
            );
          filter: blur(var(--hc-edge-fade));
          opacity: 0.9;
        }

        /* Ледь помітні бокові затемнення для об'єму */
        .side-vignette {
          position: absolute;
          inset: 0;
          z-index: 9;
          pointer-events: none;
          background:
            radial-gradient(circle at left center, rgba(0,0,0,0.22), transparent 26%),
            radial-gradient(circle at right center, rgba(0,0,0,0.22), transparent 26%);
        }

        /* Порожній шар під майбутній контент */
        .content {
          position: absolute;
          inset: 0;
          z-index: 12;
        }
      </style>

      <ha-card>
        <div class="panel">
          <div class="glass"></div>
          <div class="glass-tint"></div>

          <div class="plastic"></div>
          <div class="plastic-noise"></div>
          <div class="plastic-highlight"></div>
          <div class="split-shadow"></div>

          <div class="side-vignette"></div>
          <div class="frame"></div>

          <div class="content"></div>
        </div>
      </ha-card>
    `;
  }
}

if (!customElements.get('humidifier-card')) {
  customElements.define('humidifier-card', HumidifierCard);
}
