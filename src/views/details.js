import { html, nothing } from "../lib/lit-html.js";
import * as roomService from "../data/room.js";

const detailsTemplate = (room, isOwner, hasUser, onDelete) => html` <h2>
        ${room.name}
    </h2>
    <p>Location: ${room.location}</p>
    <p>Beds: ${room.beds}</p>
    ${hasUser && !isOwner
        ? html`<a href="/book/${room.objectId}">Book room</a>`
        : nothing}
    ${isOwner
        ? html` <a href="/edit/${room.objectId}">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)">Delete</a>`
        : nothing}`;

export function detailsView(ctx) {
    const hasUser = Boolean(ctx.user);
    const isOwner = ctx.data?.owner?.objectId === ctx.user?.objectId;
    ctx.render(detailsTemplate(ctx.data, isOwner, hasUser, onDelete));

    async function onDelete() {
        const choice = confirm("Are you sure you want to delete this room?");
        if (choice) {
            await roomService.deleteById(ctx.params.id);
            ctx.page.redirect("/rooms");
        }
    }
}
