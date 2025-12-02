import { Ticket, TicketPayload, ChecklistGroup } from './types';
import { ABRIGO_CHECKLIST_TEMPLATE, TOTEM_CHECKLIST_TEMPLATE } from './templates';

export function mergeTicket(payload: TicketPayload): Ticket {
    // 1. Select the correct template based on type
    const template = payload.type === 'Abrigo' ? ABRIGO_CHECKLIST_TEMPLATE : TOTEM_CHECKLIST_TEMPLATE;

    // 2. Deep clone the template to avoid mutating the original
    const checklist: ChecklistGroup[] = JSON.parse(JSON.stringify(template));

    // 3. Merge payload items into the template
    if (payload.checklist) {
        payload.checklist.forEach(payloadGroup => {
            const templateGroup = checklist.find(g => g.title === payloadGroup.title);
            if (templateGroup) {
                payloadGroup.items.forEach(payloadItem => {
                    const templateItem = templateGroup.items.find(i => i.key === payloadItem.key);
                    if (templateItem) {
                        templateItem.value = payloadItem.value;
                        if (payloadItem.photos) {
                            templateItem.photos = payloadItem.photos;
                        }
                    }
                });
            }
        });
    }

    // 4. Return the fully constructed Ticket
    return {
        ...payload,
        checklist
    } as Ticket;
}
