import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderSv = inject(LoaderService);
  loaderSv.isLoading.set(true);
  return next(req).pipe(
    finalize(() => {
      loaderSv.isLoading.set(false);
    }),
    catchError((err) => {
      loaderSv.isLoading.set(false);
      throw err;
    }),
  );
};
