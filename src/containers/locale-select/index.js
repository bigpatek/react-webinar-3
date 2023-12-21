import {memo, useCallback, useMemo} from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect(props) {

  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  return (
    <Select onChange={props.setLang} value={props.lang} options={options.lang}/>
  );
}

export default memo(LocaleSelect);
