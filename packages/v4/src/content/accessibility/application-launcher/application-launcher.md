---
id: Application launcher
section: components
---

An **application launcher** is an optional utility menu item that allows a user to launch a separate web application in a new browser window.

Keyboard interaction of the application launcher uses **Tab** to navigate to the application launcher toggle, **Enter** or **Space** to activate the application launcher, and arrow keys to navigate inside the application launcher menu. The **Esc** key should automatically close the menu. 


In general, the application launcher component already has accessibility built in. However, if you would like to customize it, you can do the following:

| React component| Prop or attribute | Which HTML element it appears on in markup | Explanation | 
|---|---|---|---|
| ApplicationLauncher | aria-label | .pf-c-app-launcher | Adds accessible text to the button. **Required for plain buttons or when there is no supporting text** in the application launcher toggle |
| ApplicationLauncher | favoritesLabel | .pf-c-app-launcher | 	Label for the favorites group, defaults to "Favorites". Available for customization |
| ApplicationLauncherItem | ariaIsFavoriteLabel | .pf-c-app-launcher__menu-item pf-m-action | Aria label text for favoritable button when favorited, defaults to "starred". Available for customization |
| ApplicationLauncherItem | ariaIsNotFavoriteLabel | .pf-c-app-launcher__menu-item pf-m-action | Aria label text for favoritable button when not favorited, defaults to "not starred". Available for customization |
