import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AgendaComponent } from './agenda/agenda.component';

const routes: Routes = [
  {
    path: 'blog/:page',
    component: BlogComponent,
    data: {
      title: 'blog'
    }
  },
  {
    path: 'about/:user',
    component: AboutComponent,
    data: {
      title: 'about'
    }
  },
  {
    path: 'editor/:user',
    component: MarkdownEditorComponent,
    data: {
      title: 'editor'
    }
  },
  {
    path: 'article/:title',
    component: ArticleComponent,
    data: {
      title: 'article'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'register'
    }
  },
  {
    path: 'agenda',
    component: AgendaComponent,
    data: {
      title: 'agenda'
    }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
