import React from 'react';
import './MainC.css';
import teammori from './assets/teammori.jpeg';

const MainC = () => {
  const handleExtensionClick = () => {
    console.log("Redirecting to extension download page...");
  };

  const handleSourceCodeClick = () => {
    window.open('https://github.com/HallowSiddharth/DramaShield', '_blank');
  };

  return (
    <div className='makecenter'>
      <h1 className='title'>DramaShield - Your Free Drama Defender!</h1>
      
      <div className='btns'>
        <button onClick={handleExtensionClick}>Get Extension</button>
        <button onClick={handleSourceCodeClick}>Source Code</button>
      </div>

      <div>
        <h3>About DramaShield</h3>
        <p>DramaShield deletes tweets of the users you don't like. It uses a user list, which you can add or remove users from. The tweets of all the users from the user list will be removed from your timeline. You can add users at any time, and delete users. This delete function will run every 3 seconds to handle dynamic updating of your timeline (infinite scroll).</p>
        </div>

      <div className='image-section'>
        <img src={teammori} alt='DramaShield preview' className='extension-image' />
        <p className='image-description'>
          DramaShield in action on Twitter, helping you filter out unwanted tweets.
        </p>
      </div>

      {/* Company Info Section */}
      <div className='company-info'>
        <h3>About Mori Labs</h3>
        <p>
          Mori Labs is dedicated to creating tools that empower users to take control of their digital experiences.
          With a focus on privacy, productivity, and user-centric design, Mori Labs strives to develop innovative
          solutions that enhance social media engagement without the unnecessary distractions.
        </p>
      </div>

      <div>
        <h3>How to use DramaShield?</h3>
        <p>
          1. Install the DramaShield Chrome extension.<br />
          2. Open Twitter and find the DramaShield icon in your browser toolbar.<br />
          3. Enter usernames of users whose tweets you want to block.<br />
          4. Enjoy a cleaner, drama-free timeline as DramaShield automatically filters tweets from specified users.
        </p>
      </div>

      {/* New Sections */}
      <div>
        <h3>Why Drama Shield?</h3>
        <p>
          Twitter has always had its fair share of drama queens and attention seekers. With monetization based on impressions, this has reached an all-time high. People are stirring drama just to get more impressions on their tweet and to get followers and/or money from this. For people like us, we find this extremely annoying and it is impacting our Twitter experience.
        </p>
      </div>

      <div>
        <h3>Who is it for?</h3>
        <p>
          It's for anyone who wants to just enjoy watching interesting tweets without some person creating drama and getting them tense for no reason.
        </p>
      </div>


      <div>
        <h3>How is this different from the block feature?</h3>
        <p>
          Blocking-wise, it really isn't different. But unblocking-wise: In Twitter/X, you have to:
          <ul>
            <li>Click on settings and privacy.</li>
            <li>Click on Privacy and safety.</li>
            <li>Click on Mute and block.</li>
            <li>Click on Blocked accounts.</li>
            <li>Find the account you want to unblock.</li>
            <li>Click the unblock button.</li>
          </ul>
          In Drama Shield, you can just click the extension and press the uncheck mark corresponding to the account name.
        </p>
      </div>

      <div>
        <h3>What is this NOT?</h3>
        <p>
          This is not a shut-off tool. Please don't use this to delete every tweet that doesn't necessarily agree with your opinions. This will eventually end up creating an echo chamber where every tweet you see will seem like it's agreeing with you, simply because you deleted the ones you don't agree with. Use Drama Shield responsibly. Use it only for accounts that are either really annoying, just using Twitter to stir up drama, or are having content that you really don't want to see for personal reasons.
        </p>
      </div>
    </div>
  );
}

export default MainC;
