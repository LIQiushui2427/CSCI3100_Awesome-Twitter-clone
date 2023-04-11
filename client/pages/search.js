import { useRouter } from 'next/router';
import SearchPage from '@/components/searchPage';
import LeftPane from '@/components/leftPane/leftPane';
import RightPane from '@/components/rightPane/rightPane';

function Search() {
  const router = useRouter();
  const { searchKey: searchKey } = router.query;
  console.log("Search: searchKey: ", searchKey);
  return (
    <div className="container">
      <div className="grid grid-cols-4">
        <div>
          <LeftPane />
        </div>
        <div className="col-span-2">
          <SearchPage searchKey={searchKey} />
        </div>
        <div>
          <RightPane />
        </div>
      </div>
    </div>
  );
}

export default Search;
