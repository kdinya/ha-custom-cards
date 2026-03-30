class HumidifierCard extends HTMLElement {
  setConfig(config) {
    this.innerHTML = `
      <ha-card class="card">
        <div class="container"></div>
      </ha-card>
    `;
  }
}

if (!customElements.get('humidifier-card')) {
  customElements.define('humidifier-card', HumidifierCard);
}
