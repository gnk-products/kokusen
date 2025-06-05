import { redirect } from 'next/navigation';

export default function Home() {
  // redirect to match list page
  redirect('/match');
}
