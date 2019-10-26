import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'auth/login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'auth/signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'home-page', loadChildren: './home-page/home-page.module#HomePagePageModule' },
  { path: 'auth/forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
  { path: 'job-title', loadChildren: './job-title/job-title.module#JobTitlePageModule' },
  { path: 'skills', loadChildren: './skills/skills.module#SkillsPageModule' },
  { path: 'tags', loadChildren: './tags/tags.module#TagsPageModule' },
  { path: 'job-title', loadChildren: './job-title/job-title.module' },
  { path: 'skills', loadChildren: './skills/skills.module' },
  { path: 'tags', loadChildren: './tags/tags.module' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'account-activation', loadChildren: './account-activation/account-activation.module#AccountActivationPageModule' },
  { path: 'explore', loadChildren: './explore/explore.module#ExplorePageModule' },
  //{ path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
  { path: 'more', loadChildren: './more/more.module#MorePageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
