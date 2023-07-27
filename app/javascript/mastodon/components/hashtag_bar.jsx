import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { Link } from 'react-router-dom';

import ImmutablePropTypes from 'react-immutable-proptypes';

const domParser = new DOMParser();

export const HashtagBar = ({ hashtags, text }) => {
  const renderedHashtags = useMemo(() => {
    const body = domParser.parseFromString(text, 'text/html').documentElement;
    return [].map.call(body.querySelectorAll('[rel=tag]'), node => node.textContent);
  }, [text]);

  const invisibleHashtags = hashtags.filter(hashtag => !renderedHashtags.includes(`#${hashtag.get('name')}`));

  if (invisibleHashtags.isEmpty()) {
    return null;
  }

  return (
    <div className='hashtag-bar'>
      {invisibleHashtags.map(hashtag => (
        <Link key={hashtag.get('name')} to={`/tags/${hashtag.get('name')}`}>
          #{hashtag.get('name')}
        </Link>
      ))}
    </div>
  );
};

HashtagBar.propTypes = {
  hashtags: ImmutablePropTypes.list,
  text: PropTypes.string,
};