class HumidifierCard extends HTMLElement {
  setConfig(config) {
    this.innerHTML = `
      <ha-card style="padding:20px; text-align:center;">
        <h2>✅ GitHub працює</h2>
        <div>humidifier-card підключено</div>
      </ha-card>
    `;
  }
}

if (!customElements.get('humidifier-card')) {
  customElements.define('humidifier-card', HumidifierCard);
}
