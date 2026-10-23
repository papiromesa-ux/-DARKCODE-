class DarkcodeChibi3D extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="width: 170px; height: 220px; background: blue; color: white; font-size: 20px; padding: 20px; border-radius: 12px; text-align: center;">
        ¡ESTOY VIVO!
      </div>
    `;
  }
}
if (!customElements.get("darkcode-chibi")) {
  customElements.define("darkcode-chibi", DarkcodeChibi3D);
}
