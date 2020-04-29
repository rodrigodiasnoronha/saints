import React, { useEffect, useState } from 'react';
import firebase from '../../services/firebase';
import history from '../../services/history';
import { PostOwner as Profile } from '../../types';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { Input, TextAreaInput, ProviderPainel } from '../../components';
import { Wrapper } from './styles';

const avatarPlaceholder =
    'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';

interface FormData {
    name: string;
    bio: string;
    twitter: string;
    avatar_url?: string;
}

const ProfileComponent: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        document.title = 'Perfil | Defensor do Saints';

        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const user_uid = localStorage.getItem('user_id');

            const snapshot = await firebase
                .firestore()
                .collection('users')
                .doc(user_uid)
                .get();

            if (!snapshot.exists) {
                toast.error('Usuário não encontrado');
                history.push('/provider');
            }

            const user = snapshot.data() as Profile;
            user.id = snapshot.id;

            setProfile(user);
        } catch (error) {
            toast.error('Ocorreu um erro ao mostrar seu perfil');
            history.push('/provider');
        }
    };

    const handleSelectAnImage = async (file: File | null) => {
        if (!file) {
            return 0;
        }

        try {
            const imageRef = await firebase
                .storage()
                .ref('profile_images')
                .put(file);

            const image_url = await imageRef.ref.getDownloadURL();
            setImageUrl(image_url);
        } catch (error) {
            return toast.error('Ocorreu um erro ao carregar a imagem');
        }
    };

    const updateProfileSubmitHandler = async (data: FormData) => {
        try {
            const user_uid = localStorage.getItem('user_id');

            if (imageUrl) {
                data.avatar_url = imageUrl;
            }

            await firebase
                .firestore()
                .collection('users')
                .doc(user_uid)
                .update(data);

            return toast.success('Perfil atualizado com sucesso');
        } catch (error) {
            return toast.error('Ocorreu um erro ao atualizar o seu perfil');
        }
    };

    return (
        <ProviderPainel>
            <Wrapper>
                <div className="user-info-wrapper">
                    <div className="mb-4 pt-3 card card-small">
                        <div className="border-bottom text-center card-header">
                            <div className="mb-3 mx-auto profile-pic">
                                <img
                                    className="rounded-circle"
                                    width={110}
                                    height={110}
                                    src={
                                        imageUrl ||
                                        profile?.avatar_url ||
                                        avatarPlaceholder
                                    }
                                    alt="Profile Pic"
                                    title="Profile Pic"
                                />
                            </div>

                            <h4 className="mb-0">{profile?.name}</h4>

                            <span className="text-muted d-block mb-2">
                                Admin
                            </span>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="px-4 list-group-item">
                                <strong className="text-muted d-block mb-2">
                                    Bio
                                </strong>

                                <span>{profile?.bio || 'No bio'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="form-wrapper">
                    <Form
                        initialData={profile}
                        onSubmit={updateProfileSubmitHandler}
                        className="form card p-3"
                    >
                        <h5>Account details</h5>

                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <Input name="name" id="name" placeholder="Name" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="twitter">Twitter</label>
                            <Input
                                name="twitter"
                                id="twitter"
                                placeholder="@username"
                            />
                        </div>

                        <TextAreaInput
                            placeholder="Bio..."
                            name="bio"
                            className="form-control"
                        ></TextAreaInput>

                        <div className="custom-file mt-2 mb-2">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="customFile"
                                onChange={(event) =>
                                    handleSelectAnImage(event.target.files[0])
                                }
                            />

                            <label
                                className="custom-file-label"
                                htmlFor="customFile"
                            >
                                Choose a profile pic
                            </label>
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Update account
                        </button>

                        <button className="btn btn-danger mt-2" type="button">
                            Cancel
                        </button>
                    </Form>
                </div>
            </Wrapper>
        </ProviderPainel>
    );
};

export default ProfileComponent;
