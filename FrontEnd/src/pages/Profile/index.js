import React from 'react';
import { Col, Row, Card, Avatar, List } from 'antd';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import SuggestCarousel from '~/components/SuggestCarousel';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const cx = classNames.bind(styles);
    return (
        <Col>
            <Row>
                <div className={cx('logo')}>
                    <img src="logo.png" />
                </div>
                <div className={cx('info')}>
                    <h1>Nguyễn Quang Độ</h1>
                    <p>email</p>
                </div>
            </Row>
            <SuggestCarousel title="Your Saved Subjects " />
        </Col>
    );
}

export default Profile;
