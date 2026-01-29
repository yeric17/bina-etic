import { Route } from "@angular/router";

export const homeRoutes:Route[] = [
    {
        path: '',
        loadComponent: () => import('../../shared/layout/base-layout/base-layout').then(m => m.BaseLayout),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
            }
        ]
    }
];