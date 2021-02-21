import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";

import { IBirthday } from "./IBirthday";
export class SPServices {
    private _context: WebPartContext = null;
    constructor(ctx: WebPartContext) {
        this._context = ctx;
        sp.setup({
            spfxContext: this._context
        });
    }

    public async getBirthdays() {
        const listitems: any[] = await sp.web.lists.getByTitle("Birthdays").items.select("Id, Name/Title, Name/EMail, Date").expand("Name").get();
        return listitems;
    }

}
