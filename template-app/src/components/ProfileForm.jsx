import * as React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/VerifiedUser';

const ProfileForm = (props) => {
    const { profile } = props;

    return (
        profile.map((user, index) => 
            <FormControl key={index}>
                <InputLabel htmlFor={user.label}>{user.label}</InputLabel>
                <Input
                    id={user.label}
                    readOnly={true}
                    value={user.value}
                    startAdornment={
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                    }
                />
            </FormControl>
        )
   );
};

export default ProfileForm;
