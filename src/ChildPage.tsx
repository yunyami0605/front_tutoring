import { useState } from 'react';
import './ChildPage.css';
import axios from 'axios';
/**
 * 1. export 는 중괄호로 가져온다.
 * - 여러개 export 가능
 *
 * 2. export default {}없이 가져온다.
 * - 하나만 export 가능
 *
 */
// export 는 중괄호로 가져온다.
// export default {}없이 가져온다.

function ChildPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    axios.post('/login', form);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="input_field">
        <label htmlFor="email" className="label">
          email
        </label>

        <input
          name="email"
          id="email"
          value={form.email} // password:1234
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          //   onChange={(e) => setForm( {...form, email: e.target.value} )}
          //   onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input_field">
        <label htmlFor="password" className="label">
          password
        </label>

        <input
          name="password"
          id="password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>

      <button type="submit">전송</button>
    </form>
  );
}

export default ChildPage;
