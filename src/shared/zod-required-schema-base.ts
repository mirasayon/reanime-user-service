import psl from "better-psl";
import consola from "consola";
import { z } from "zod";
/** Utility Zod schemas */
class ZodRequiredSchemaBase {
    // prettier-ignore
    private reservedWordsForUsernames: string[] = ["about","access","account","accounts","activate","activities","activity","address","admin","administration","administrator","adult","advertising","affiliate","affiliates","ajax","alpha","analysis","analytics","android","anon","anonymous","apps","archive","archives","article","asct","asset","atom","auth","authentication","avatar","backup","balancer-manager","banner","banners","beta","billing","blog","blogs","board","book","bookmark","bots","business","cache","cadastro","calendar","call","campaign","cancel","captcha","career","careers","cart","categories","category","cgi-bin","changelog","chat","check","checking","checkout","client","cliente","clients","code","codereview","comercial","comment","comments","communities","community","company","compare","compras","config","configuration","connect","contact","contact-us","contact_us","contactus","contest","contribute","corp","create","dashboard","data","default","delete","demo","design","designer","destroy","devel","developer","developers","diagram","diary","dict","dictionary","direct_messages","directory","dist","docs","documentation","domain","download","downloads","ecommerce","edit","editor","education","email","employment","empty","enterprise","entries","entry","error","errors","eval","event","exit","explore","facebook","favorite","favorites","feature","features","feed","feedback","feeds","file","files","first","flash","fleet","fleets","flog","follow","followers","following","forgot","form","forum","forums","founder","free","friend","friends","gadget","gadgets","game","games","ghost","gift","gifts","gist","github","graph","group","groups","guest","guests","help","home","homepage","host","hosting","hostmaster","hostname","howto","html","http","httpd","https","iamges","icon","icons","idea","ideas","image","images","imap","index","indice","info","information","inquiry","instagram","intranet","invitations","invite","ipad","iphone","issue","issues","item","items","java","javascript","jobs","join","json","jump","knowledgebase","language","languages","last","ldap-status","legal","license","link","links","linux","list","lists","log-in","log-out","log_in","log_out","login","logout","logs","mail","mail1","mail2","mail3","mail4","mail5","mailer","mailing","maintenance","manager","manual","maps","marketing","master","media","member","members","message","messages","messenger","microblog","microblogs","mine","mobile","movie","movies","music","musicas","mysql","name","named","navi","navigation","network","news","newsletter","nick","nickname","notes","noticias","notification","notifications","notify","ns10","null","oauth","oauth_clients","offer","offers","official","online","openid","operator","order","orders","organization","organizations","overview","owner","owners","page","pager","pages","panel","password","payment","perl","phone","photo","photoalbum","photos","phpmyadmin","phppgadmin","phpredisadmin","pics","ping","plan","plans","plugin","plugins","policy","pop3","popular","portal","post","postfix","postmaster","posts","premium","press","price","pricing","privacy","privacy-policy","privacy_policy","privacypolicy","private","product","products","profile","project","projects","promo","public","purpose","python","query","random","ranking","read","readme","recent","recruit","recruitment","register","registration","release","remove","replies","report","reports","repositories","repository","request","requests","reset","root","ruby","rule","sale","sales","sample","samples","save","school","script","scripts","search","secure","security","self","send","server","server-info","server-status","service","services","session","sessions","setting","settings","setup","share","shop","show","sign-in","sign-up","sign_in","sign_up","signin","signout","signup","site","sitemap","sites","smartphone","smtp","soporte","source","spec","special","ssladmin","ssladministrator","sslwebmaster","staff","stage","staging","start","stat","state","static","stats","status","store","stores","stories","style","styleguide","stylesheet","stylesheets","subdomain","subscribe","subscriptions","suporte","support","sysadmin","sysadministrator","system","tablet","tablets","talk","task","tasks","team","teams","tech","telnet","term","terms","terms-of-service","terms_of_service","termsofservice","test","test1","test2","test3","teste","testing","tests","theme","themes","thread","threads","todo","tool","tools","topic","topics","tour","translations","trends","tutorial","twitter","undef","unfollow","unsubscribe","update","upload","uploads","usage","user","username","users","usuario","vendas","version","video","videos","visitor","watch","weather","webhook","webhooks","webmail","webmaster","website","websites","welcome","widget","widgets","wiki","windows","word","work","works","workshop","www1","www2","www3","www4","www5","www6","www7","wwws","wwww","xmpp","yaml","year","yourdomain","yourname","yoursite","yourusername","admin","administrator","root","superuser","sysadmin","system","operator","developer","error","moderator","undefined","support","help","info","contact","sales","billing","security","abuse","postmaster","webmaster","mail","email","smtp","imap","status","monitor","dashboard","guest","anonymous","test","tester","terms","cookie","cookies","owner","manager","moderator","rootuser","super","reanime","reanimeapp","reanimeart","reanimeweb","anime","reanime.art"]

    /** Regexp for login string.
     *
     *  Description:
     *	The line must be written in lowercase letters.
     *	There may be letters, numbers and underscores in the middle.
     *	The line must not end with an underscore.
     *
     *	An example of a string that matches the expression is `user_name123`, and an incorrect example is `user_name_`.
     */
    private _username_regex = /^(?=.{4,24}$)(?!.*(?:\.\.|__))(?![_.])[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)*$/;

    // export const _username_regex = /^[a-z][a-z0-9_]*[a-z0-9]$/;
    private username_regex_error =
        "Неверный формат имени пользователя. Допустимые символы: A-Z, 0-9, _, . Имя не может начинаться/заканчиваться на _ или ., не должно быть последовательных __ или .." as const;

    private usernameSchemaConfig = {
        min: 4,
        max: 24,
        error: `Имя пользователя обязательна`,
    };
    /** min  4,
     *  max 24;
     * @param name
     * @returns
     */
    accountUsernameValidatorSchema = z
        .string({
            error: this.usernameSchemaConfig.error,
        })
        .trim()
        .min(this.usernameSchemaConfig.min, {
            error: `Имя пользователя должно содержать как минимум ${this.usernameSchemaConfig.min} символов`,
        })
        .max(this.usernameSchemaConfig.max, {
            error: `Имя пользователя должно содержать меньше либо ровно ${this.usernameSchemaConfig.max} символов`,
        })
        .regex(this._username_regex, { error: this.username_regex_error })
        .transform((val) => val.toLowerCase())
        .refine((val) => !this.reservedWordsForUsernames.includes(val), {
            error: "Это имя пользователя зарезервировано",
        })
        .refine(
            (val) => {
                const parsed = psl.parse(val);
                if (parsed.error) {
                    return true;
                }
                if (!parsed.parsed) {
                    return true;
                }
                if (!parsed.parsed.listed) {
                    return true;
                }
                if (parsed.parsed.tld) {
                    const passes = !psl.rules.includes(parsed.parsed.tld);
                    return passes;
                }
                consola.error("Unexpected validation handle. input: ", val);
                return false;
            },
            {
                error: "Имя пользователя не может заканчиваться суффиксом домена (.com, .net и т.д.)",
            },
        );

    /** Regex for Unicode letters (L) and combining marks (M), plus spaces, hyphens, apostrophes, underscores, and digits: */
    private nicknameRegex = /^[\p{L}\p{M}0-9 _'-]+$/u;
    /**  UserProfile nickname validator. Min 1 chars. Max 30 chars */
    profileNickname = z
        .string({
            error: `Требуется Никнейм`,
        })
        .trim()
        .min(1, {
            error: `Требуется Никнейм`,
        })
        .max(30, {
            error: `Слишком длинный никнейм (максимум 30 символов)`,
        })
        .refine((val) => val === val.normalize("NFC"), {
            error: "Никнейм содержит недопустимые символы",
        })
        .regex(this.nicknameRegex, {
            error: "Никнейм может содержать только буквы (любого языка), цифры, пробелы, дефисы, подчеркивания, апострофы",
        });

    /** `undefined` data type validator */
    void = z.undefined();
    /** UserAccount inputted password
     * @defaultValue min 8
     * @defaultValue max 80
     */
    account_password = (() => {
        const min: number = 8;
        const max: number = 80;
        return z
            .string({
                error: "Поле для пароля обязательно",
            })
            .min(min, {
                error: `Пароль должен содержать более ${min} символов`,
            })
            .max(max, {
                error: `Пароль должен содержать меньше ${max} символов`,
            });
    })();
    /** min = 0; max = 300;
     * @param name
     * @returns ZodString
     */
    userAgent = (() => {
        const name: string = "Пользовательский агент";
        const min = 0;
        const max = 300;
        const error = `Невалидный ${name}`;

        return z
            .string({ error })
            .trim()
            .min(min, {
                error: `Field for ${name} must be more than ${min} symbol`,
            })
            .max(max, {
                error: `Field for ${name} must be less than ${max} symbols`,
            })
            .optional();
    })();
    /** IP format */
    ipAddress = z.string({ error: "IP-адрес обязателен" });

    /** Just boolean type validator.  */
    justBoolean = (name: string) => {
        const invalid_txt = `Field for ${name} must be a boolean`;
        return z
            .boolean({
                error: invalid_txt,
            })
            .readonly();
    };
    /** For pagination.
     *
     * @Default 1
     *
     *  min = 1
     *  max = Infinity;
     */
    pageNumber = (() => {
        const min = 1;
        const required_txt = `Номер страницы обязателен`;
        return z.coerce
            .number({
                error: required_txt,
            })
            .int({ error: `Номер страницы должен быть целым числом` })
            .positive({
                error: `Номер страницы должен быть позитивным числом`,
            })
            .min(min, { error: `Номер страницы должен быть больше ${min}` })
            .default(1);
    })();
    /**
     * For pagination
     *  min = 1;
     *  max = Infinity;
     * @param name
     * @returns
     */
    pageSize = (() => {
        const name = "Размер одной страницы для пагинации";
        const min = 1;
        const error = `${name} должен быть числом`;
        return z.coerce
            .number({ error })
            .int({ error: `${name} должно быть целым числом` })
            .positive({
                error: `${name} должен быть положительным числом`,
            })
            .min(min, { error: `${name} должен быть больше ${min}` });
    })();

    private animeIdConfig = {
        min: 1,
        max: 10_000_000,
        error: `Требуется айди аниме`,
    };
    /** Shikimori ID. number. With coerce
     * min = 1;
     * max = 10_000_000;
     */
    animeId = z.coerce
        .number({ error: this.animeIdConfig.error })
        .int({ error: `Айди аниме должно быть целым числом` })
        .positive({
            error: `Айди аниме должно быть положительным целым числом`,
        })
        .min(this.animeIdConfig.min, {
            error: `Айди аниме должен быть больше ${this.animeIdConfig.min}`,
        })
        .max(this.animeIdConfig.max, {
            error: `Айди аниме должен быть меньше ${this.animeIdConfig.max}`,
        });

    /** Text validator for comments, reply etc.
     *
     * @min 1
     * @max 10000 symbols
     *
     * @param name Description for field
     * @returns zod schema
     */
    message = (name: string) => {
        const min = 1;
        const max = 10_000;
        const invalid_txt = `Поле для ${name} должно быть строкой`;
        const required_txt = `Поле для ${name} обязательно`;

        return z
            .string({ error: (issue) => (issue.input === undefined ? required_txt : invalid_txt) })
            .trim()
            .min(min, {
                error: `Поле для ${name} должно содержать более ${min} символов`,
            })
            .max(max, {
                error: `Поле для ${name} должно быть меньше ${max} символов.`,
            });
    };
    /**
     * Classic CUID validator  @length 20
     * @param name
     * @returns zod schema
     */
    cuid = (name: string) => {
        const invalid_txt = `Поле для ${name} имеет недопустимый CUID`;
        const required_txt = `Поле для ${name} обязательно`;
        return z.cuid({ error: (issue) => (issue.input === undefined ? required_txt : invalid_txt) });
    };

    reply_id = this.cuid("Айди ответа на комментарий");
    comment_id = this.cuid("Айди комментария");

    /** Email Validator */
    email = z
        .email({ error: "Адрес электронной почты должен быть действительным" })
        .trim()
        .max(100, { error: "Адрес электронной почты должен быть короче 100 символов" });

    /** Zod validator for LoginSession Token in the header from the request
     * @stringLength 577
     */
    // session_token = (() => {
    //     return z.string().length(577, { error: "Длина токена сеанса должна составлять ровно 577 символов" });
    // })();

    session_meta = z.strictObject({
        ip: this.ipAddress,
        agent: this.userAgent,
    });

    /**  For reporting replies and comments */
    details = this.message("Подробности");
    /** For report type  */
    report_type = z.enum(["spam", "offensive", "other"] as const);
}
export const zodRequiredSchemaBase = new ZodRequiredSchemaBase();
