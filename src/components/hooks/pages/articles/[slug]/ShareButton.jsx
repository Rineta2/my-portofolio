import styles from "@/app/articles/Articles.module.scss";

import PropTypes from "prop-types";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function ShareButton({
  shareUrl,
  shareTitle,
  shareDescription,
  tags,
  shareImage,
  shareCategory,
}) {
  const formattedTags = tags?.length
    ? tags.map((tag) => `#${tag}`).join(" ")
    : "";

  return (
    <div
      className={styles.share__buttons}
      role="region"
      aria-label="Share article"
    >
      <h3>Share :</h3>
      <div className={styles.share__container}>
        <FacebookShareButton
          url={shareUrl}
          quote={`${shareTitle}\n\n${shareDescription}\n\n${formattedTags}`}
          hashtag={tags?.length ? `#${tags[0]}` : ""}
          picture={shareImage}
          aria-label="Share on Facebook"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={`${shareTitle}\n\n${shareDescription}\n\n${formattedTags}`}
          hashtags={[...tags, shareCategory].filter(Boolean)}
          image={shareImage}
          via="rizki_ramadhan"
          aria-label="Share on Twitter"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={`${shareTitle}\n\n${shareDescription}\n\n${formattedTags}`}
          separator="\n\n"
          aria-label="Share on WhatsApp"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
}

ShareButton.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  shareTitle: PropTypes.string.isRequired,
  shareDescription: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  shareImage: PropTypes.string,
  shareCategory: PropTypes.string,
};

ShareButton.defaultProps = {
  tags: [],
  shareImage: "",
  shareCategory: "",
  shareDescription: "",
  shareTitle: "",
};
