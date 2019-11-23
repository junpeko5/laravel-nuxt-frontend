export default function({store, redirect}) {
  if (store.getters['authentication/authenticated']) {
    return redirect('/dashboard')
  }
}
