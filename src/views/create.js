import { html } from "../lib/lit-html.js";
import * as roomService from "../data/room.js";
import { sumbitHandler } from "../util.js";

const createTemplate = (onSubmit) => html`
    <h2>Host Room</h2>
    <form @submit=${onSubmit}>
        <label> Name: <input type="text" name="name" /></label>
        <label> Location: <input type="text" name="location" /></label>
        <label> Beds: <input type="number" name="beds" /></label>
        <button>Create</button>
    </form>
`;

export function createView(ctx) {
    ctx.render(createTemplate(sumbitHandler(onSubmit)));

    async function onSubmit({ name, location, beds }) {
        beds = parseInt(beds);
        if (name == "" || location == "" || Number.isNaN(beds)) {
            return alert("All fields required!");
        }

        const userId = ctx.user?.objectId;
        const result = await roomService.create(
            { name, location, beds },
            userId
        );

        ctx.page.redirect("/rooms/" + result.objectId);
    }
}
