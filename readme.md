# NawigacjaSGGW-mobile

## How to run

> [!NOTE]
> you need to have android sdk installed with correct path variables

```bash
npm install
# android
npm run android
```

## Dir structure

- **app** - screens of the app, file based routing.
- **components** - components used in the app.
- **translation** - translations of the app, i18n and stuff.
- **hooks** - react hooks.
- **store** - zustand stores.
- **core** - some important libraries.

## What libraries are we using

- [**maplibre-react-native**](https://github.com/maplibre/maplibre-react-native) - the map rendering library, suppports openstreet map with many styles, rendering some paths on map etc.
- [**expo-location**](https://docs.expo.dev/versions/latest/sdk/location/) - tracking users location.
- [**expo-router**](https://docs.expo.dev/router/introduction/) - navigation in application, stack based etc, the paths for navigation are file based.
- [**zustand**](https://github.com/pmndrs/zustand) - state management, managing global state of the app.
- [**i18next**](https://www.i18next.com/) - internationalization.
- [**nativewind**](https://www.nativewind.dev/) - styling application using tailwindcss, for our components(3rd party may have some issues).
- [**react-native-async-storage**](https://github.com/react-native-async-storage/async-storage) persistency to zustand(it may be not desired in some cases tho).

## Code styling

> [!IMPORTANT]
> install **PRETTIER PLUGIN** and **ESLINT PLUGIN** in your editor so the code style stays consistent when you are formatting the code
> also you cann run `npm run format` or `npm run lint` to fromat or lint whole project

Of course adhere to the javascript guidelines, use cammelCase and all,
use function keyword when making react components.
[naming](https://google.github.io/styleguide/tsguide.html#naming)
[language features](https://google.github.io/styleguide/tsguide.html#language-features)
[type system](https://google.github.io/styleguide/tsguide.html#type-system)
