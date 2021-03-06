import React, {useCallback, useRef} from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import * as Yup from 'yup';
import Input from '../../components/input';
import Button from '../../components/button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidateErrors';

const SignUp: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório!'),
        email: Yup.string().email('Digite um e-mail válido!').required('E-mail obrigatório!'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos!'),
      });

      await schema.validate(data,{abortEarly: false});
    } catch (error) {
      const errors = getValidationErrors(error);
      formRef.current?.setErrors(errors);
      console.log(error);
    }
  }, []);

  return(
    <Container>
    <Background/>

    <Content>
      <img src={logoImg} alt="Gobarber"/>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Faça seu cadastro</h1>
        
        <Input name="name" icon={FiUser} placeholder="Nome"/>
        <Input name="email" icon={FiMail} placeholder="E-mail"/>
        <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

        <Button type="submit">Cadastrar</Button>
      </Form>
      <a href="http://">
        <FiArrowLeft />
        Voltar para tela de logon 
      </a>
    </Content>
  </Container>
  );
}

export default SignUp;