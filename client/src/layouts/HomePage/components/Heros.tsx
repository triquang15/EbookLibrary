import {useOktaAuth} from '@okta/okta-react';
import { Link } from 'react-router-dom';

export const Heros = () => {

    const { authState } = useOktaAuth();

    return (
        <div>
        <div className="d-none d-lg-block">
            <div className="row g-0 mt-5">
                <div className="col-sm-6 col-md-6">
                    <div className="col-image-left"></div>
                </div>

                <div className="col-4 col-md-5 container d-flex justify-content align-items-center">
                    <div className="ml-2">
                        <h3>Hidden gems: Libby app features you may not know about</h3>
                        <p>
                         Hello again, readers! Last time, we took a look at some of the best new Libby features of 2022. We’ve got some more great stuff in the works for 2023, but how well do you know the features that are already in the Libby app? Let’s look at some cool features you might not know about.
                        </p>
                        {authState?.isAuthenticated ?
                            <Link type="button" className='btn btn-danger btn-sm text-white' to='search'>Explore Top Books</Link>
                            :
                        <Link to='/login' className="btn btn-danger btn-sm text-white">Read more</Link>
                    }
                        
                    </div>
                </div>
            </div>
            
            <div className="row g-0">
                <div className="col-4 col-md-5 container d-flex justify-content-center align-items-center">
                    <div className="ml-2">
                        <h3>Books on sober living to continue the Dry January challenge</h3>
                        <p>
                        Could you abstain from alcohol for a month? Many took on the challenge, otherwise known as Dry January or taking a 31-day break from alcohol. The health campaign started by Alcohol Change UK began in 2013, with the goal of the challenge to experience improvements in both your mental and physical health. 
                        </p>
                        {authState?.isAuthenticated ?
                            <Link type="button" className='btn btn-danger btn-sm text-white' to='search'>Explore Top Books</Link>
                            :
                        <Link to='/login' className="btn btn-danger btn-sm text-white">Read more</Link>
                    }
                    </div>
                </div>
                <div className="col-sm-6 col-md-6">
                    <div className="col-image-right"></div>
                </div>
            </div>
        </div>

            {/* Mobile */ }
    <div className="d-lg-none">
        <div className="container">
            <div className="m-2">
                <div className="col-image-left">
                    <div className="mt-2">
                        <h3>9 essential reads for Black History Month and beyond</h3>
                        <p className="lead">
                        These nonfiction reads about Black history written by Black authors include books for even the youngest readers, because it’s never too early to learn about the accomplishments and experiences of those who came before.
                        </p>
                        <a href="#" className="btn btn-danger btn-sm text-white btn-sm">Sign Up</a>
                    </div>
                </div>
                <div className="m-2">
                    <div className="col-image-right"></div>
                    <div className="mt-2">
                        <h3>Bestselling author Jason Reynolds on why he loves reading</h3>
                        <p className="lead">
                        He stands 6 foot 3 inches, but hearing him speak to a gymnasium of students, he couldn’t be more down to Earth. Former National Ambassador for Young People’s Literature and author Jason Reynolds has been crafting stories for young people for the last decade, and with over 7 million books sold, he’s doing a pretty good job reaching them. While his books are about the Black experience, he hopes his writing inspires his readers to find their own story.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}