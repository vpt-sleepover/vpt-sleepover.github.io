import { html } from "../lib/lit-html.js";

const homeTemplate = () => html`
    <h1>Welcome to VPT Sleepover</h1>
    <p>
        Find accomodation in many locations across the country.
        <a href="/rooms">Browse catalog</a>
    </p>
    <p>Have a room to offer? <a href="/host">Place your ad right now!</a></p>
`;

export function homeView(ctx) {
    ctx.render(homeTemplate());
}
