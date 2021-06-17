let routes = {};
let templates = {};

const routeMapper = (url) => {
    if(routes[url]) {
        return url;
    } else {
        url = url.replace(/\?[\w=%]*/, '');
        return url;
    }
};

export const template = (name, templateFunction) => {
    return templates[name] = templateFunction;
};

export const route = (path, template) => {
    if (typeof template == "function") {
        return routes[path] = template;
    }
    else if (typeof template == "string") {
        return routes[path] = templates[template];
    }
    else {
        return;
    }
};

let resolveRoute = (route) => {
    try {
        return routes[route];
    } catch (error) {
        throw new Error("The route is not defined");
    }
};

let router = (evt) => {
    const url = routeMapper(window.location.hash.slice(1)) || "/";
    const routeResolved = resolveRoute(url);
    routeResolved();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
