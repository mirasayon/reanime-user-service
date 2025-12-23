export const frontendUrl = new (class FrontendUrl {
    dev = "http://192.168.0.105:3642" as const;
    test = "http://192.168.0.105:2642" as const;
    prod = "https:reanime.art" as const;
})();
