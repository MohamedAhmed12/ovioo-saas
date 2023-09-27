export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const ObjectHasVal = (object: Object, val: any) => Object.values(object).includes(val);
export const splitName = (name: string | null | undefined) => {
    const fullName = name?.split(" ");
    const firstname = fullName?.[0] || "";
    const lastname = fullName?.[1] || "";

    return { firstname, lastname };
};
